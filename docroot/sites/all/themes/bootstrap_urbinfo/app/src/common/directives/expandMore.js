(function () {
  angular
    .module('urbinfo.common')
    .directive('expandMore', expandMore);

  expandMore.$inject = ['$window', '$timeout'];

  /**
   * Restricts content to a maximum height with a 'More' button to expand.
   */
  function expandMore($window, $timeout) {
    return {
      restrict: 'A',
      transclude: true,
      template: '<div class="expand-more"><div class="expand-more__content"><div ng-transclude></div></div><a href="" class="expand-more__toggle"></a></div>',
      link: function (scope, element, attrs) {
        var $toggle = element.find('.expand-more__toggle'),
          $content = element.find('.expand-more__content'),
          expanded = false,
          maxHeight = attrs.expandMore;

        $content.css({
          'overflow': 'hidden',
          'max-height': maxHeight,
          '-webkit-transition': 'max-height .5s',
          '-moz-transition': 'max-height .5s',
          'transition': 'max-height .5s'
        });

        var containerHeight = $content.height();

        $timeout(update, 100);
        angular.element($window).resize(update);

        $toggle.click(function (e) {
          e.preventDefault();
          expanded = !expanded;
          update();
        });

        function update() {
          var contentHeight = $content.children().height();
          if (contentHeight <= containerHeight) {
            $toggle.hide();
            $content.css('max-height', null);
          } else {
            if (expanded) {
              $content.css('max-height', contentHeight);
              $toggle.text(Drupal.t('Less…'));
            } else {
              $content.css('max-height', maxHeight);
              $toggle.text(Drupal.t('More…'));
            }
          }
        }
      }
    };
  }
}());
