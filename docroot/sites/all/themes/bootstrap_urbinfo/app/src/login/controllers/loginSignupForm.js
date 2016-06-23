(function () {
  'use strict';

  angular
    .module('urbinfo.login')
    .controller('loginSignupForm', loginSignupForm);

  loginSignupForm.$inject = ['$scope'];

  /**
   * loginSignupForm controller.
   */
  function loginSignupForm($scope) {
    $scope.mode = 'login';
    $scope.switchMode = switchMode;

    function switchMode(mode) {
      $scope.mode = mode;
    }
  }

}());
