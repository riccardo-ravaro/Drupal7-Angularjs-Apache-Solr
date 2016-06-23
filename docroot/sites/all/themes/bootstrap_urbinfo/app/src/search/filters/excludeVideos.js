(function () {
  angular
    .module('urbinfo.search')
    .filter('excludeVideos', excludeVideos);

  /**
   * Apply Drupal image style to original image URL.
   */
  function excludeVideos() {
    return function (items) {
      var filtered = [];
      angular.forEach(items, function (item) {
        if (angular.isString(item)) {
          if (item.indexOf('.jpg') !== -1 || item.indexOf('.jpeg') !== -1 || item.indexOf('.png') !== -1 || item.indexOf('.gif') !== -1) {
            filtered.push(item);
          }
        }
      });
      return filtered;
    };
  }
}());
