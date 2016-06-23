(function () {
  'use strict';

  angular
    .module('urbinfo.login')
    .controller('SignupForm', SignupForm);

  SignupForm.$inject = ['$scope', '$http', '$window', 'baseUrl', 'tokenManager'];

  /**
   * SignupForm controller.
   */
  function SignupForm($scope, $http, $window, baseUrl, tokenManager) {
    $scope.submitted = false;
    $scope.error = false;
    $scope.loading = false;
    $scope.formErrors = {};
    $scope.submit = submit;
    $scope.baseUrl = baseUrl;
    $scope.signupFormVisible = false;
    $scope.showForm = showForm;
    tokenManager.authorize();
    $scope.formTime = new Date().getTime();

    function showForm() {
      $scope.signupFormVisible = true;
    }

    function submit() {
      var params = {
        field_full_name: {und: [{value: $scope.field_full_name}]},
        //pass: $scope.pass,
        mail: $scope.mail,
        name: $scope.mail,
        honeypot_time: $scope.formTime
      };

      $scope.submitted = true;
      $scope.error = false;

      if (!$scope.signupForm.$invalid) {
        $scope.loading = true;

        $http.post('/api/v1/entity_user/register', params, {headers: {'X-CSRF-Token': tokenManager.token, 'X-URBINFO-Token': tokenManager.getUrbinfoToken()}})
          .success(function () {
            if (Drupal.destinationUrl) {
              $window.location.href = Drupal.destinationUrl;
            } else {
              $window.location.reload(true);
            }
          })
          .error(function (response) {
            $scope.formErrors = response.form_errors;
            $scope.error = true;
            $scope.loading = false;
          });
      }
    }
  }

}());
