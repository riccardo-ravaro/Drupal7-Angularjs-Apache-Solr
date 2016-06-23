(function () {
  angular
    .module('urbinfo.business')
    .factory('specials', specials);

  function specials() {
    return Drupal.settings.urbinfo.specials;
  }
}());
