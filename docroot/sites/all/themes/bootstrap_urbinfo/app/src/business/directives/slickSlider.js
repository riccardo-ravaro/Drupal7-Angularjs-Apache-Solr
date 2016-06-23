(function () {
  angular
    .module('urbinfo.business')
    .directive('slickSlider', slickSlider);

  slickSlider.$inject = ['$timeout'];

  /**
   * Directive that displays slick-slider.
   *
   * Usage:
   * Add slick-slider="options" attribute to the element.
   * options is a scope variable that can hold options object for slick-slider.
   */
  function slickSlider($timeout) {
    return {
      restrict: 'A',

      link: function (scope, element, attrs) {

        // Get options from attributes.
        var options = scope.$eval(attrs.slickSlider);

        // Take a timeout before displaying slider.
        $timeout(function () {
          window.$(element).slick(options);
        });

      }
    };
  }

})();
