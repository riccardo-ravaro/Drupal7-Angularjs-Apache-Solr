(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('Directions', Directions);

  Directions.$inject = ['$scope', '$timeout', 'currentNode', 'config', 'location', 'leafletData'];

  /**
   * Fetches and displays directions to business on profile page.
   */
  function Directions($scope, $timeout, currentNode, config, location, leafletData) {
    $scope.getDirections = getDirections;
    $scope.geo = {};
    $scope.mode = 'DRIVING';
    $scope.route = null;
    $scope.error = null;
    $scope.submitted = false;

    $scope.showStep = function (i) {
      var step = $scope.route.steps[i],
        lat = step.lat_lngs[0].lat(),
        lng = step.lat_lngs[0].lng();

      leafletData.getMap().then(function (map) {
        $scope.map.center.lat = lat;
        $scope.map.center.lng = lng;
        $scope.map.center.zoom = 14;

        $timeout(function () {
          L.popup()
          .setLatLng([lat, lng])
          .setContent(step.instructions)
          .openOn(map);
        }, 250);
      });

      scrollToMap();
    };

    function getDirections() {
      var destination = currentNode.field_location.und[0].lat + ',' + currentNode.field_location.und[0].lon,
        origin = $scope.geo.center ? $scope.geo.center : $scope.location;

      $scope.error = null;
      $scope.submitted = true;

      if (origin) {
        $scope.loading = true;
        location.directions(origin, destination, $scope.mode).then(success, error);
      }
    }

    function success(response) {
      var northEast = response.routes[0].bounds.getNorthEast(),
        southWest = response.routes[0].bounds.getSouthWest(),
        polyline = L.Polyline.fromEncoded(response.routes[0].overview_polyline);

      $scope.$parent.showDirectionsForm = false;
      $scope.loading = false;
      $scope.route = response.routes[0].legs[0];

      // Scroll to map.
      scrollToMap();

      // Add route path.
      $scope.map.paths.directions.latlngs = polyline.getLatLngs();

      // Fit map to bounds.
      leafletData.getMap().then(function (map) {
        map.fitBounds([
          [southWest.lat(), southWest.lng()],
          [northEast.lat(), northEast.lng()]
        ]);
      });

      // Add origin marker.
      $scope.map.markers.origin = {
        lat: $scope.map.paths.directions.latlngs[0].lat,
        lng: $scope.map.paths.directions.latlngs[0].lng,
        icon: {
          type: 'awesomeMarker',
          icon: 'star',
          markerColor: config.map.markerColor
        }
      };
    }

    function scrollToMap() {
      var top = angular.element('#map').offset().top - angular.element('#navbar').height();
      angular.element('body, html').animate({scrollTop: top + 'px'});
    }

    function error(response) {
      $scope.loading = false;
      if (response.status === 'NOT FOUND') {
        $scope.error = Drupal.t('Sorry, we couldn’t find that location');
      } else {
        $scope.error = Drupal.t('Sorry, there was a problem finding your directions');
      }
    }
  }

}());
