(function () {
  angular
    .module('urbinfo.common')
    .filter('imageStyle', imageStyle);

  /**
   * Apply Drupal image style to original image URL.
   */
  function imageStyle() {
    return function (originalUrl, styleName) {
      if (originalUrl.indexOf('sites/default/files')) {
        return originalUrl.replace('sites/default/files', 'sites/default/files/styles/' + styleName + '/public');
      }
    };
  }
}());
