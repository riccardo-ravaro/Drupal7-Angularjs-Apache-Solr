(function () {
  'use strict';

  angular
    .module('urbinfo.search')
    .controller('SearchResults', SearchResults);

  SearchResults.$inject = ['$scope', '$compile', '$templateCache', '$location', '$timeout', 'config', 'search', 'searchQuery', 'leafletData', 'location', 'facilities', 'businessTypes'];

  /**
   * SearchResults controller.
   */
  function SearchResults($scope, $compile, $templateCache, $location, $timeout, config, search, searchQuery, leafletData, location, facilities, businessTypes) {
    var updatingMap = false;

    // Scope properites:

    // Services
    $scope.businessTypes = businessTypes;
    $scope.facilities = facilities;
    $scope.search = search;

    // State
    $scope.state = {
      // Index of marker with popup open.
      activeIndex: 0,
      // Index of list result with mouse hover.
      hoverIndex: null,
      // Should we automatically perform an new search in the current map area?
      updateOnDrag: true,
      // Has map moved since the last search (i.e. if updateOnDrag = false)?
      mapMoved: false,
      // Visible result display on small screen - list/map.
      viewMode: 'list',
      // Filters panel expanded state.
      filtersOpen: false
    };

    // Map data
    $scope.map = {
      defaults: {
        tileLayerOptions: {detectRetina: true},
        maxZoom: config.map.maxZoom,
        minZoom: config.map.minZoom,
        // Inertia screws with our drag end handler as the map position continues
        // to change after the event has fired.
        inertia: false
      },
      bounds: null,
      layers: null,
      center: {
        lat: 1,
        lng: 1,
        zoom: config.map.defaultZoom
      },
      markers: []
    };

    // Google Maps supports more languages than Mapbox, so we choose a map
    // provider based on config.
    if (config.map.useMapbox) {
      $scope.map.defaults.tileLayer = config.map.tileLayer;
    } else {
      $scope.map.layers = {
        baselayers: {
          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google'
          }
        }
      };
    }


    // Scope methods:

    $scope.searchInMapLocation = searchInMapLocation;
    $scope.searchQuery = searchQuery;
    $scope.toggleFilter = toggleFilter;

    // Watch callbacks:

    $scope.$watch('state.viewMode', onViewModeChange);
    $scope.$watch('search.pager.page', search.getResults);

    // Event callbacks:

    $scope.$on('leafletDirectiveMap.popupopen', opPopupOpen);
    $scope.$on('leafletDirectiveMap.dragend', onMapMove);
    $scope.$on('leafletDirectiveMap.zoomend', onMapMove);
    $scope.$on('search.updated', onSearchUpdated);
    $scope.$on('$locationChangeSuccess', onLocationChange);

    // Set intitial state.

    updateMap();

    // Close filters when clicking outside header.
    // Todo: refactor to a directive.
    angular.element('body').on('click', '.has-filters-open', function () {
      $scope.state.filtersOpen = false;
      $scope.$apply();
    });
    angular.element('.search-results__header').click(function (e) {
      e.stopPropagation();
    });

    /**
     * Enable / disable a facet filter by name.
     */
    function toggleFilter(filter) {
      var idx = searchQuery['f[]'].indexOf(filter);
      // Is currently selected.
      if (idx > -1) {
        searchQuery['f[]'].splice(idx, 1);
      }
      // Is newly selected.
      else {
        searchQuery['f[]'].push(filter);
      }
      search.query(searchQuery);
    }

    /**
     * Callback to update search or flag as moved when map is dragged / zoomed.
     */
    function onMapMove() {
      if (!updatingMap) {
        if ($scope.state.updateOnDrag) {
          search.loading = true;
          // Leave a slight delay to ensure Map data has updated to final drag
          // position.
          $timeout(searchInMapLocation, 300);

        } else {
          $scope.state.mapMoved = true;
        }
      }
    }

    /**
     * Callback triggered when popup is opened on map.
     */
    function opPopupOpen(event, leafletEvent) {
      var newScope = $scope.$new(),
        index = leafletEvent.leafletEvent.popup.options.index;

      // Set the active index to highlight the corresponding list result.
      $scope.state.activeIndex = index;

      // Get the result object for this marker and use it to render the dynamic
      // content in the popup template
      newScope.result = search.results[index];
      $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
    }

    /**
     * Callback triggered when search results are updated.
     */
    function onSearchUpdated() {
      updateMap();
      // Close search menu in mobile nav.
      angular.element('#header-search').removeClass('in');
      $scope.state.mapMoved = false;
      $location.search(searchQuery);
    }

    /**
     * Callback triggered when results view mode (list or map) is changed on small
     * screens.
     */
    function onViewModeChange() {
      if ($scope.state.viewMode === 'map') {
        // Trigger redraw when switching to map view.
        leafletData.getMap().then(function (map) {
          map.invalidateSize(false);
          updateMap();
        });
      }
    }

    /**
     * Callback triggered when URL location is changed with the $location
     * service.
     */
    function onLocationChange() {
      var params = $location.search();

      // Check we actaully have some params i.e. not page load.
      if (params.query) {
        var query = angular.extend({
          'f[]': [],
          query: null,
          center: null,
          locationText: null,
          lat_min: null,
          lat_max: null,
          lng_min: null,
          lng_max: null
        }, params);

        // Make sure f[] is array, not string if single value.
        if (!angular.isArray(query['f[]'])) {
          query['f[]'] = [query['f[]']];
        }

        // Check if criteria has actually changed.
        if (!angular.equals(searchQuery, query)) {
          angular.extend(searchQuery, query);
          search.query(searchQuery);
        }
      }
    }

    /**
     * Update search coordinates from current map position.
     */
    function searchInMapLocation() {
      searchQuery.center = $scope.map.center.lat + ',' + $scope.map.center.lng;
      searchQuery.lat_min = $scope.map.bounds.southWest.lat;
      searchQuery.lng_min = $scope.map.bounds.southWest.lng;
      searchQuery.lat_max = $scope.map.bounds.northEast.lat;
      searchQuery.lng_max = $scope.map.bounds.northEast.lng;
      // Set a large distance so we include everything in the bounding box and
      // search still sort by distance from center.
      searchQuery.dist = 100000;

      searchQuery.locationText = Drupal.t('Map location');
      search.query(searchQuery);
    }

    /**
     * Set the map position and markers from the current search.
     */
    function updateMap() {
      var coords = search.params.center.split(','),
        lat = parseFloat(coords[0]),
        lng = parseFloat(coords[1]),
        popup = $templateCache.get('search/views/map-result.html');

      updatingMap = true;
      $timeout(function () {
        updatingMap = false;
      }, 1000);

      // Update marker data.
      $scope.map.markers = [];
      angular.forEach(search.results, function (result, i) {
        $scope.map.markers[i] = {
          lat: parseFloat(result.field_location_lat),
          lng: parseFloat(result.field_location_lon),
          message: popup,
          popupOptions: {
            index: i,
            minWidth: 280
          },
          icon: {
            type: 'awesomeMarker',
            icon: businessTypes[result.field_business_type].icon,
            markerColor: config.map.markerColor
          }
        };
      });

      // Update position if the search location has changed.
      if ($scope.map.center.lat !== lat && $scope.map.center.lng !== lng) {
        // Set map center.
        $scope.map.center.lat = lat;
        $scope.map.center.lng = lng;

        // Set bounding box / zoom level.
        leafletData.getMap().then(function (map) {
          $timeout(function () {
            // If the search includes a bounding box, set the map to fit.
            if (searchQuery.lat_min) {
              map.fitBounds([
                [parseFloat(search.params.lat_min), parseFloat(search.params.lng_min)],
                [parseFloat(search.params.lat_max), parseFloat(search.params.lng_max)]
              ]);

            // If we don't have a bounding box but we do have results, generate
            // a bounding box to include all markers while still centered over
            // the search point.
            } else if (search.results.length) {
              // Get bounding box for markers.
              var bounds = L.latLngBounds($scope.map.markers);
              centerBounds(bounds, lat, lng);
              map.fitBounds(bounds);

            // For empty searches use a fixed zoom level.
            } else {
              $scope.map.center.zoom = config.map.defaultZoom;
            }
          }, 10);
        });
      }
    }

    /**
     * Extend the bounding box to be centered over a point
     */
    function centerBounds(bounds, lat, lng) {
      // Get distance from center point in each direction.
      var westDiff = lng - bounds.getWest(),
        eastDiff = bounds.getEast() - lng,
        southDiff = lat - bounds.getSouth(),
        northDiff = bounds.getNorth() - lat,
        newPoint = [];

      // Using largest distances, extend bounds with an extra marker
      // that puts our center point in the middle.
      if (northDiff > southDiff) {
        newPoint[0] = lat - northDiff;
      } else {
        newPoint[0] = lat + southDiff;
      }
      if (eastDiff > westDiff) {
        newPoint[1] = lng - eastDiff;
      } else {
        newPoint[1] = lng + westDiff;
      }
      bounds.extend(newPoint);
    }

  }

}());
