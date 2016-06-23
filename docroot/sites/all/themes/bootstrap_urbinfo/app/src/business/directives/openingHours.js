(function () {
  angular
    .module('urbinfo.business')
    .directive('openingHours', openingHours);

  /**
   * Displays table of business opening hours.
   */
  function openingHours() {
    return {
      restrict: 'A',
      templateUrl: 'business/views/opening-hours.html',
      scope: {
        hours: '=openingHours'
      },
      controller: controller
    };

    function controller($scope, dayNames) {

      // Local variables.
      var dayNumber = new Date().getDay() - 1;
      // JS day numbers start on Sunday.
      if (dayNumber < 0) {
        dayNumber = 6;
      }

      // Scope variables.
      $scope.editMode = false;
      $scope.progress = false;
      $scope.submitted = false;
      $scope.showAdditionalTimeRow = false;
      $scope.canEdit = $scope.$parent.canEdit;
      $scope.input = {};
      $scope.today = dayNames[dayNumber];
      $scope.dayNames = dayNames;

      // Scope methods.
      $scope.edit = edit;
      $scope.save = save;
      $scope.cancel = cancel;

      // Scope method definition.
      function edit() {
        $scope.editMode = true;
        $scope.progress = false;
        $scope.submitted = false;
      }

      function save() {
        $scope.submitted = true;
        if (!$scope.form.$invalid) {

          $scope.progress = true;
          $scope.$parent.business.field_opening_hours.und = [];

          // Process data from days input and assign it to the Drupal field value.
          for (var dayName in $scope.input.days) {
            if ($scope.input.days[dayName] !== undefined) {

              for (var index in $scope.input.days[dayName]) {
                if ($scope.input.days[dayName][index] !== undefined) {
                  var dayNumber = dayNames.indexOf(dayName) + 1,
                      item = $scope.input.days[dayName][index];

                  if (dayNumber > 6) {
                    dayNumber = 0;
                  }

                  if (item.start.hours !== 'na' && item.start.minutes !== 'na' && item.end.hours !== 'na' && item.end.minutes !== 'na') {
                    $scope.$parent.business.field_opening_hours.und.push({
                      day: dayNumber,
                      starthours: item.start.hours + item.start.minutes,
                      endhours: item.end.hours + item.end.minutes
                    });
                  }

                }
              }

            }
          }

          // Update business resourse.
          $scope.$parent.business.$update()
            .then(function () {
              $scope.progress = false;
              $scope.editMode = false;
              updateHours();
            });
        }
      }

      function cancel() {
        $scope.editMode = false;
      }

      // Local method definition.
      function updateHours() {
        $scope.days = {};
        $scope.input.days = {};

        // Go through the values and process them.
        angular.forEach($scope.hours, function (item) {
          var dayNumber = item.day - 1;
          if (dayNumber < 0) {
            dayNumber = 6;
          }

          // Add days for output.
          var dayName = dayNames[dayNumber];
          if ($scope.days[dayName] === undefined) {
            $scope.days[dayName] = [];
            $scope.input.days[dayName] = [];
          }

          $scope.days[dayName].push({
            start: dateTime(item.starthours),
            end: dateTime(item.endhours)
          });

          // Add days for input.
          $scope.input.days[dayName].push({
            start: {
              hours: formatTime(item.starthours.substring(0, item.starthours.length - 2)),
              minutes: formatTime(item.starthours.substring(item.starthours.length - 2, item.starthours.length))
            },
            end: {
              hours: formatTime(item.endhours.substring(0, item.endhours.length - 2)),
              minutes: formatTime(item.endhours.substring(item.endhours.length - 2, item.endhours.length))
            }
          });

        });

        // Fill all days with empty values.
        angular.forEach($scope.input.days, function (day) {
          if (day[0] === undefined) {
            $scope.input.days.push({start: {hours: 'na', minutes: 'na'}, end: {hours: 'na', minutes: 'na'}});
          }
        });
      }

      function dateTime(time) {
        var date = new Date();
        date.setHours(time.substring(0, time.length - 2));
        date.setMinutes(time.substring(time.length - 2, time.length));
        return date;
      }

      function formatTime(value) {
        if (value === '' || value === '0' || value === undefined) {
          return '00';
        }
        return value;
      }

      // Execution.
      updateHours();
    }

  }

}());
