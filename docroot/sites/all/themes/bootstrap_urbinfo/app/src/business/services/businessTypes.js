(function () {
  angular
    .module('urbinfo.business')
    .factory('businessTypes', businessTypes);

  /**
   * Provides list of avaialble business types.
   */
  function businessTypes() {
    return Drupal.settings.urbinfo.businessTypes;
  }
}());
