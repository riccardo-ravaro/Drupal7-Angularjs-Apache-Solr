(function () {
  angular
    .module('urbinfo.business')
    .directive('slickSliderDynamic', slickSliderDynamic);

  slickSliderDynamic.$inject = ['$timeout'];

  /**
   * Directive that displays slick-slider with dynamic data.
   *
   * Use this directive if your slick-slider's data is changeable.
   *
   * Usage:
   * 1) Add slick-slider="options" attribute to the element.
   * options is a scope variable that can hold options object for slick-slider.
   * 2) Add slick-slider-items attribute and assign data with slider items.
   * 3) Add slick-slider-template-url attribute with a slider inner html template.
   * 4) Add slick-slider-items-name attribute with a name for slider items variable.
   */
  function slickSliderDynamic($timeout) {
    return {
      restrict: 'A',
      templateUrl: function (element, attrs) { return attrs.slickSliderDynamicTemplateUrl; },
      link: function (scope, element, attrs) {

        // Get options from attributes.
        var options = scope.$eval(attrs.slickSliderDynamic);

        // Get items from
        var items = scope.$eval(attrs.slickSliderDynamicItems);

        scope.$on('slick-slider-data-updated', function () {
          sliderInit();
        });

        function sliderInit() {
          items = scope.$eval(attrs.slickSliderDynamicItems);
          window.$(element).unslick();
          scope[attrs.slickSliderDynamicItemsName] = angular.copy(items);
          $timeout(function () {
            window.$(element).slick(options);
          });
        }

        sliderInit();
      }
    };
  }

})();
