(function () {
  angular
    .module('urbinfo.common')
    .factory('config', config);

  function config() {
    return Drupal.settings.urbinfo.config;
  }
}());
