(function () {
  angular
    .module('urbinfo.common')
    .directive('requiredFile', requiredFile);

  /**
   * requiredFile directive.
   */
  function requiredFile() {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, ngModel) {
        el.bind('change', function () {
          scope.$apply(function () {
            ngModel.$setViewValue(el.val());
            ngModel.$render();
          });
        });
      }
    };
  }
}());
