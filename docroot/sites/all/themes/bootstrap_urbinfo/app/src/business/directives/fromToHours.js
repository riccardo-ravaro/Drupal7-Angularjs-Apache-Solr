(function () {
  angular
    .module('urbinfo.business')
    .directive('fromToHours', fromToHours);

  /**
   * Displays table of business opening hours.
   */
  function fromToHours() {
    return {
      restrict: 'E',
      templateUrl: 'business/views/from-to-hours.html',
      require: 'ngModel',
      link: link,
      scope: {
        name: '@'
      }
    };

    // iElement, iAttrs, ngModelController
    function link(scope, iElement, iAttrs, ngModel) {
      scope.hour_options = {
        'n/a': 'na',
        '00': '00',
        '01': '1',
        '02': '2',
        '03': '3',
        '04': '4',
        '05': '5',
        '06': '6',
        '07': '7',
        '08': '8',
        '09': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23'
      };

      scope.minute_options = {
        'n/a': 'na',
        '00': '00',
        '05': '05',
        '10': '10',
        '15': '15',
        '20': '20',
        '25': '25',
        '30': '30',
        '35': '35',
        '40': '40',
        '45': '45',
        '50': '50',
        '55': '55'
      };

      scope.showAdditionalTimeRow = false;
      scope.showAdditionalTimeRowTrigger = function () {
        scope.showAdditionalTimeRow = true;
        scope.model.push({start: {hours: 'na', minutes: 'na'}, end: {hours: 'na', minutes: 'na'}});
      };

      ngModel.$render = function () {
        scope.model = angular.copy(ngModel.$viewValue);
      };

      scope.$watch('model', function (value) {
        ngModel.$setViewValue(value);
        validate(value);
      }, true);

      function validate(values) {
        for (var index in values) {
          if (values[index] !== undefined) {
            var value = values[index];
            var validity = (value.start.hours === 'na' && value.start.minutes === 'na' && value.end.hours === 'na' && value.end.minutes === 'na') || (value.start.hours !== 'na' && value.start.minutes !== 'na' && value.end.hours !== 'na' && value.end.minutes !== 'na');
            ngModel.$setValidity('fromToHours', validity);
          }
        }
      }

    }

  }
}());