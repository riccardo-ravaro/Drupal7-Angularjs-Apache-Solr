(function () {
  angular
    .module('urbinfo.search')
    .directive('locationField', locationField);

  locationField.$inject = ['$compile', '$parse', 'location', 'config'];

  /**
   * Input with location completion and geo lookup.
   */
  function locationField($compile, $parse, location, config) {
    return {
      require: 'ngModel',
      restrict: 'A',
      replace: false,
      terminal: true,
      scope: {
        ngModel: '=ngModel',
        geo: '=locationFieldGeo'
      },
      link: link
    };

    function link(scope, element, attrs, ngModel) {
      // Scope methods.
      scope.getGeocodeMatches = getGeocodeMatches;
      scope.detectLocation = detectLocation;
      scope.useGeocodeMatch = useGeocodeMatch;

      // Prevent browser autocomplete.
      element.attr('autocomplete', 'off');

      element.addClass('location-field__text');

      // Add additional directives
      element.attr('typeahead', 'address.value for address in getGeocodeMatches($viewValue)');
      element.attr('typeahead-min-length', '4');
      element.attr('typeahead-loading', 'progress');
      element.attr('typeahead-on-select', 'useGeocodeMatch($item)');

      // Replace ng-model with variable in this scope.
      element.attr('ng-model', 'ngModel');

      // Element event handlers.
      element.bind('keydown', function () {
        clearGeoLocation();
        scope.$apply();
      });
      element.bind('focus', function () {
        if (isPsuedo()) {
          ngModel.$setViewValue('');
          scope.$apply();
        }
      });

      // Remove this directive's attribute to prevent recursion on compile.
      element.removeAttr('location-field');
      element.removeAttr('data-location-field');

      // Wrap element.
      element.wrap('<div class="location-field" />');

      // Add location lookup button.
      var buttonHtml = '<button type="button" class="location-field__detect" ng-click="detectLocation()">';
      buttonHtml += '<span class="icon" ng-class="{\'icon-scope\': !progress, \'icon-refresh\': progress, \'rotating\': progress}"></span>';
      buttonHtml += '</button>';
      element.after(buttonHtml);

      // Compile to apply new directives.
      $compile(element.parent())(scope);

      /**
       * Callback for type-ahead suggestions.
       */
      function getGeocodeMatches(query) {
        scope.progress = true;
        return location.geocode(query)
          .then(function (response) {
            scope.progress = false;
            var matches = [];
            angular.forEach(response.data.results, function (result) {
              matches.push({
                value: result.formatted_address,
                data: result
              });
            });
            return matches;
          });
      }

      /**
       * Get the user's current location from device or IP address.
       */
      function detectLocation() {
        scope.progress = true;
        clearGeoLocation();
        ngModel.$setViewValue(Drupal.t('Finding location…'));

        if (navigator.geolocation) {
          // Get location from browser if supported.
          navigator.geolocation.getCurrentPosition(function success(position) {
            // Do a reverse geo lookup to get a readable address.
            location.geocodeReverse(position.coords.latitude, position.coords.longitude)
              .then(function (response) {
                ngModel.$setViewValue(response.data.results[0].formatted_address);
                // Use the returned geo coordinates.
                scope.geo.center = position.coords.latitude + ',' + position.coords.longitude;
                scope.progress = false;
              });
          },
          function err() {
            ngModel.$setViewValue('');
            getLocationByGeoIp();
          },
          { timeout: 20 * 1000 }
          );
        } else {
          // Lookup IP address with GeoIP service.
          getLocationByGeoIp();
        }
      }

      function getLocationByGeoIp() {
        location.geoIp().success(function (response) {
          var location_name = [];
          if (response.city !== undefined && response.city.length > 0) {
            location_name.push(response.city);
          }
          if (response.country_name !== undefined && response.country_name.length > 0) {
            location_name.push(response.country_name);
          }
          ngModel.$setViewValue(location_name.join(', '));
          scope.geo.center = response.latitude + ',' + response.longitude;
          scope.progress = false;
        })
        .error(function () {
          scope.progress = false;
          alert('Failed to obtain your location. Please retry');
        });
      }

      /**
       * Reset all geo data.
       */
      function clearGeoLocation() {
        scope.geo.center = null;
        scope.geo.lat_min = null;
        scope.geo.lng_min = null;
        scope.geo.lat_max = null;
        scope.geo.lng_max = null;
        scope.geo.dist = config.location.pointDistance;
      }

      /**
       * Populate geo data using a Geocoded location result.
       */
      function useGeocodeMatch(match) {
        clearGeoLocation();
        scope.geo.center = match.data.geometry.location.lat + ',' + match.data.geometry.location.lng;

        // If the match includes a bounding box use this.
        if (match.data.geometry.bounds !== undefined) {
          scope.geo.lat_min = match.data.geometry.bounds.southwest.lat;
          scope.geo.lng_min = match.data.geometry.bounds.southwest.lng;
          scope.geo.lat_max = match.data.geometry.bounds.northeast.lat;
          scope.geo.lng_max = match.data.geometry.bounds.northeast.lng;
          // Set a large distance so we include everything in the bounding box and
          // search still returns distances from center.
          scope.geo.dist = 100000;
        }
      }

      /**
       * Detect whether the location text is system generated, rather than user input.
       */
      function isPsuedo() {
        return ngModel.$viewValue === Drupal.t('My location') || ngModel.$viewValue === Drupal.t('Map location');
      }
    }
  }
}());
