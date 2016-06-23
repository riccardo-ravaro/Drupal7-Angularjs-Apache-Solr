(function () {
  angular
    .module('urbinfo.common')
    .factory('baseUrl', baseUrl);

  function baseUrl() {
    var path = Drupal.settings.basePath;
    if (Drupal.settings.urbinfo.language.current.prefix) {
      path += Drupal.settings.urbinfo.language.current.prefix + '/';
    }
    return path;
  }
}());
