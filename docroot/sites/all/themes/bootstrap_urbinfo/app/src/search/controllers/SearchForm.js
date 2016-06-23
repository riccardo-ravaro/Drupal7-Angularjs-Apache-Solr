(function () {
  'use strict';

  angular
    .module('urbinfo.search')
    .controller('SearchForm', SearchForm);

  SearchForm.$inject = ['$scope', 'searchQuery', 'search', 'location', 'businessTypes', 'config'];

  /**
   * SearchForm controller.
   */
  function SearchForm($scope, searchQuery, search, location, businessTypes, config) {

    // Scope properties:

    $scope.searchQuery = searchQuery;
    $scope.submitted = false;

    // Populate business types from service to use as typeahead suggestions.
    $scope.businessTypeNames = [];
    angular.forEach(businessTypes, function (businessType) {
      $scope.businessTypeNames.push(businessType.name);
    });

    // Scope methods:

    $scope.submit = submit;

    // Event callbacks:

    // Add submit handler to form.
    // ng-submit doesn't work because form has an action attribute for fallback.
    angular.element('.search-form').submit(function (e) {
      e.preventDefault();
      submit();
      $scope.$apply();
    });

    /**
     * Submit form.
     */
    function submit() {
      $scope.submitted = true;

      if (searchQuery.query) {
        if (searchQuery.center) {
          // Perform the search if the query includes coordinates.
          search.query(searchQuery);

        } else if (searchQuery.locationText) {
          // Geocode the text input.
          location.geocode(searchQuery.locationText)
            .success(function (response) {
              // Perform search using the first result if we have one.
              if (response.results.length) {
                useGeocodeMatch(response.results[0]);
                search.query(searchQuery);
              }
            });
        }
      }
    }

    /**
     * Populate geo data using a Geocoded location result.
     */
    function useGeocodeMatch(match) {
      searchQuery.dist = config.location.pointDistance;
      searchQuery.center = match.geometry.location.lat + ',' + match.geometry.location.lng;

      // If the match includes a bounding box use this.
      if (match.geometry.bounds !== undefined) {
        searchQuery.lat_min = match.geometry.bounds.southwest.lat;
        searchQuery.lng_min = match.geometry.bounds.southwest.lng;
        searchQuery.lat_max = match.geometry.bounds.northeast.lat;
        searchQuery.lng_max = match.geometry.bounds.northeast.lng;
        // Set a large distance so we include everything in the bounding box and
        // search still returns distances from center.
        searchQuery.dist = 100000;
      }
    }
  }

}());
