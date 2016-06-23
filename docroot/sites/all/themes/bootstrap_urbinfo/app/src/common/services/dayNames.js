(function () {
  angular
    .module('urbinfo.common')
    .factory('dayNames', dayNames);

  function dayNames() {
    return Drupal.settings.urbinfo.dayNames;
  }
}());
