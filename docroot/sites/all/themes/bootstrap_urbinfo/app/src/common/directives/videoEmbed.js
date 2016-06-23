(function () {
  angular
    .module('urbinfo.common')
    .directive('videoEmbed', videoEmbed);

  /**
   * videoEmbed directive.
   */
  function videoEmbed() {
    return {
      restrict: 'E',
      scope: {
        'url': '='
      },
      link: function (scope, element) {
        element.html(scope.url.replace(/[\w\W]+watch\?v=([\w\W]+)/, '<div class="video-container"><iframe src="http://www.youtube.com/embed/$1" frameborder="0" width="560" height="315"></iframe></div>'));
      }
    };
  }
}());
