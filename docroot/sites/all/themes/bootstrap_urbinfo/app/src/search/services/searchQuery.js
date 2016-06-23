(function () {
  angular
    .module('urbinfo.search')
    .factory('searchQuery', searchQuery);

  function searchQuery() {
    // Populate with current search data when on the results page.
    if (Drupal.settings.urbinfo !== undefined && Drupal.settings.urbinfo.search !== undefined) {
      return Drupal.settings.urbinfo.search.params;
    } else {
      return {'f[]': []};
    }
  }
}());
