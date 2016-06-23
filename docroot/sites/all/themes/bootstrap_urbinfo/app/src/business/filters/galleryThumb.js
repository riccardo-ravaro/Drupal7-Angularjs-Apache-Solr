(function () {
  angular
    .module('urbinfo.business')
    .filter('galleryThumb', galleryThumb);

  galleryThumb.$inject = ['imageStyleFilter'];

  /**
   * Genrate thumbnail image URL for image.
   */
  function galleryThumb(imageStyleFilter) {
    return function (url) {
      if (url.indexOf('youtube.com') !== -1) {
        return url.replace(/[\w\W]+watch\?v=([\w\W]+)/, 'http://img.youtube.com/vi/$1/hqdefault.jpg');
      } else {
        return imageStyleFilter(url, 'gallery_thumbnail');
      }
    };
  }
}());
