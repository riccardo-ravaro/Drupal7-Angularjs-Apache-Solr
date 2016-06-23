(function () {
  angular
    .module('urbinfo.search')
    .factory('search', search);

  search.$inject = ['$http', '$rootScope'];

  function search($http, $rootScope) {
    var onResultsPage = false,
      apiUrl = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'api/v1/search',
      pageUrl = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'search',
      searchService = {
        results: [],
        pager: {
          pages: null,
          page: null,
          count: null,
          limit: null
        },
        params: {
          query: null,
          center: null,
          locationText: null,
          lat_min: null,
          lat_max: null,
          lng_min: null,
          lng_max: null
        },
        loading: false,
        query: query,
        getResults: getResults
      };

    // Populate with current search data when on the results page.
    if (Drupal.settings.urbinfo !== undefined && Drupal.settings.urbinfo.search !== undefined) {
      angular.extend(searchService, Drupal.settings.urbinfo.search);
      onResultsPage = true;
    }

    return searchService;

    /**
     * Fetch results using the current query and page parameters.
     */
    function getResults() {
      searchService.loading = true;

      // Add page number.
      if (searchService.pager.page > 1) {
        searchService.params.page = searchService.pager.page - 1;
      }

      $http({method: 'GET', url: apiUrl, params: searchService.params})
        .success(function (response) {
          searchService.loading = false;
          searchService.results = response.results;
          searchService.pager = response.pager;
          searchService.facets = response.facets;
          $rootScope.$broadcast('search.updated');
        })
        .error(function (response, status) {
          searchService.loading = false;
          searchService.results = [];
          console.log(status + ': ' + response);
        });
    }

    /**
     * Perform new search query.
     */
    function query(searchQuery) {
      searchService.params = angular.copy(searchQuery);

      // Call API if on results page.
      if (onResultsPage) {
        searchService.pager.page = 1;
        getResults();
      // Simulate form submit if on another page.
      } else {
        window.location.href = pageUrl + '?' + jQuery.param(searchService.params).replace(/\+/g, '%20');
      }
    }
  }
}());
