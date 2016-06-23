(function () {
  angular
    .module('urbinfo.common')
    .directive('notifyWhenRepeatFinished', notifyWhenRepeatFinished);

  notifyWhenRepeatFinished.$inject = ['$timeout'];

  function notifyWhenRepeatFinished($timeout) {
    return {
      restrict: 'A',
      link: function (scope) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('repeatFinished');
          });
        }
      }
    };
  }
}());
