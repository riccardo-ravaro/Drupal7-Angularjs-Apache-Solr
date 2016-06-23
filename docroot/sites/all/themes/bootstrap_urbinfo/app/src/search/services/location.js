(function () {
  angular
    .module('urbinfo.search')
    .factory('location', locationService);

  locationService.$inject = ['$http', '$cookies', '$q', '$window', 'config', 'language'];

  function locationService($http, $cookies, $q, $window, config, language) {
    var region = $cookies.region;

    if (!region) {
      geoIp().success(function (response) {
        region = response.country_code.toLowerCase();
        // UK doesn't follow normal TLD rules.
        if (region === 'gb') {
          region = 'uk';
        }
        $cookies.region = region;
      });
    }

    return {
      region: region,
      geocode: geocode,
      geoIp: geoIp,
      geocodeReverse: geocodeReverse,
      directions: directions
    };

    function geocode(address) {
      var request = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
          address: address,
          language: language.current.language
        }
      };
      if (region) {
        request.region = region;
      }
      return $http(request);
    }

    function geoIp() {
      return $http({method: 'GET', url: 'http://freegeoip.net/json/'});
    }

    function geocodeReverse(lat, lng) {
      return $http({method: 'GET', url: 'https://maps.googleapis.com/maps/api/geocode/json', params: {
        latlng: lat + ',' + lng,
        language: language.current.language,
        key: config.api.googleApiKey
      }});
    }

    function directions(from, to, mode) {
      var deferred = $q.defer();

      $window.getDirections = function () {
        var directionsService = new google.maps.DirectionsService(),
          request = {
            origin: from,
            destination: to,
            travelMode: mode
          };

        directionsService.route(request, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        });
      };

      if ($window.google === undefined) {
        jQuery.getScript('https://maps.googleapis.com/maps/api/js?key=' + config.api.googleApiKey + '&callback=getDirections&language=' + language.current.language);
      } else {
        $window.getDirections();
      }

      return deferred.promise;
    }
  }
}());
