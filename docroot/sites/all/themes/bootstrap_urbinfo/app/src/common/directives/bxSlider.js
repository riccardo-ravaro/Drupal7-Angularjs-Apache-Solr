(function () {
  angular
    .module('urbinfo.common')
    .directive('bxSlider', bxSlider);

  /**
   * bxSlider directive.
   */
  function bxSlider() {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var slider;
        $scope.$on('repeatFinished', init);
        $scope.refreshSlider = init;

        function init() {
          if (slider) {
            slider.destroySlider();
          }
          // Don't initialize on small screens.
          //if (angular.element($window).width() >= 768) {
          slider = element.bxSlider($scope.$eval('{' + attrs.bxSlider + '}'));
          //}
        }
      }
    };
  }
}());
