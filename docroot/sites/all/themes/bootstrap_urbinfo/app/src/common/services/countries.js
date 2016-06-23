(function () {
  angular
    .module('urbinfo.common')
    .factory('countries', countries);

  function countries() {
    return Drupal.settings.urbinfo.countries;
  }
}());
