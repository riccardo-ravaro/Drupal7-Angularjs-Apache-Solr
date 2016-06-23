(function () {
  angular
    .module('urbinfo.common')
    .directive('compareTo', compareTo);

  /**
   * compareTo directive.
   */
  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function (scope, element, attributes, ngModel) {

        function validate(value) {
          return ngModel.$setValidity('compareTo', value === ngModel.$modelValue);
        }

        scope.$watch('otherModelValue', function (value) {
          validate(value);
        });

        scope.$watch(function () { return ngModel.$modelValue; }, function () {
          validate(scope.otherModelValue);
        });

      }
    };
  }
}());
