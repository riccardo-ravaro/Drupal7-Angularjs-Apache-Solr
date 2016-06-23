(function () {
  'use strict';

  angular
    .module('urbinfo.login')
    .controller('LoginForm', LoginForm);

  LoginForm.$inject = ['$scope', '$http', '$window', 'baseUrl'];

  /**
   * LoginForm controller.
   */
  function LoginForm($scope, $http, $window, baseUrl) {
    $scope.submitted = false;
    $scope.error = false;
    $scope.loading = false;
    $scope.submit = submit;
    $scope.baseUrl = baseUrl;

    function submit() {
      var params = {
        username: $scope.name,
        password: $scope.pass
      };

      $scope.submitted = true;
      $scope.error = false;

      if (!$scope.loginForm.$invalid) {
        $scope.loading = true;

        $http.post('/api/v1/entity_user/login', params)
        .success(function () {
          if (Drupal.destinationUrl) {
            $window.location.href = Drupal.destinationUrl;
          } else {
            $window.location.reload(true);
          }
        })
        .error(function () {
          $scope.error = true;
          $scope.loading = false;
        });
      }
    }
  }

}());
