(function () {
  angular
    .module('urbinfo.business')
    .factory('facilities', facilities);

  function facilities() {
    return Drupal.settings.urbinfo.facilities;
  }
}());
