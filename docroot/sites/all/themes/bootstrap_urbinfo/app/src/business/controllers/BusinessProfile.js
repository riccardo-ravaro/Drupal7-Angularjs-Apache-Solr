(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('BusinessProfile', BusinessProfile);

  BusinessProfile.$inject = ['$scope', '$window', 'currentNode', 'language',
    'countries', 'businessTypes', 'facilities', 'specials', 'config', 'canEdit',
    'baseUrl', 'editorOptions', 'field'];

  /**
   * Main controller for business profile page.
   */
  function BusinessProfile($scope, $window, currentNode, language, countries,
      businessTypes, facilities, specials, config, canEdit, baseUrl, editorOptions, field) {

    $scope.canEdit = canEdit;
    $scope.business = currentNode;
    $scope.lang = language.current.language;
    $scope.countries = countries;
    $scope.businessTypes = businessTypes;
    $scope.facilities = facilities;
    $scope.specials = specials;
    $scope.showDirectionsForm = false;
    $scope.rtl = (angular.element('html').attr('dir') === 'rtl');
    $scope.baseUrl = baseUrl;
    $scope.editorOptions = editorOptions;
    $scope.url = $window.location.href;

    // Helper functions to get field content in correct language.
    $scope.selectLang = language.selectFieldLanguage;
    $scope.getLang = language.getFieldLanguage;

    $scope.setLatLng = setLatLng;

    // Map data
    $scope.setLatLng();

    $scope.map = {
      defaults: {
        tileLayerOptions: {detectRetina: true},
        tileLayer: config.map.tileLayer,
        // Inertia screws with our drag end handler as the map position continues
        // to change after the event has fired.
        inertia: false,
        scrollWheelZoom: false
      },
      bounds: null,
      center: {
        lat: $scope.latitude,
        lng: $scope.longitude,
        zoom: config.map.defaultZoom
      },
      markers: {
        business: {
          lat: $scope.latitude,
          lng: $scope.longitude,
          icon: {
            type: 'awesomeMarker',
            icon: businessTypes[field.getValue(currentNode.field_business_type, 0, 'tid')].icon,
            markerColor: config.map.markerColor
          }
        }
      },
      paths: {
        directions: {
          color: '#008000',
          weight: 3,
          latlngs: []
        }
      }
    };

    $scope.$watch('business.field_location', function () {
      $scope.setLatLng();
      $scope.map.center.lat = $scope.latitude;
      $scope.map.center.lng = $scope.longitude;
      $scope.map.markers.business.lat = $scope.latitude;
      $scope.map.markers.business.lng = $scope.longitude;
    });

    $scope.$watch('business.field_business_type', function () {
      if (currentNode.field_business_type.und !== undefined) {
        $scope.map.markers.business.icon.icon = businessTypes[currentNode.field_business_type.und[0].tid].icon;
      }
    });

    function setLatLng() {
      var latitude = field.getValue(currentNode.field_location, 0, 'lat'),
          longitude = field.getValue(currentNode.field_location, 0, 'lon');

      if (!latitude || !longitude) {
        latitude = '0.00000';
        longitude = '0.00000';
      }

      $scope.latitude = parseFloat(latitude);
      $scope.longitude = parseFloat(longitude);
    }

    $scope.dayNames = Drupal.settings.urbinfo.dayNames;

    $scope.print = function () {
      $window.print();
    };
  }

}());