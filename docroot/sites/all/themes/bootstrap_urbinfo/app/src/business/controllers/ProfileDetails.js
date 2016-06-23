(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('ProfileDetails', ProfileDetails);

  ProfileDetails.$inject = ['$scope', 'language', 'field'];

  /**
   * Inline editing of main details on business profile page.
   */
  function ProfileDetails($scope, language, field) {
    $scope.editMode = false;
    $scope.progress = false;
    $scope.submitted = false;

    $scope.input = {};

    $scope.edit = edit;
    $scope.save = save;
    $scope.cancel = cancel;

    function edit() {
      $scope.input = {
        title: field.getValue($scope.business.title_field, 0, 'value'),
        type: field.getValue($scope.business.field_business_type, 0, 'tid'),
        address: field.getValue($scope.business.field_address, 0)
      };
      $scope.editMode = true;
      $scope.progress = false;
      $scope.submitted = false;
    }

    function save() {
      $scope.submitted = true;

      if (!$scope.form.$invalid) {
        $scope.progress = true;
        $scope.business.title = $scope.input.title;
        $scope.business.title_field[$scope.lang] = [{value: $scope.input.title}];
        $scope.business.field_business_type.und = [{tid: $scope.input.type}];
        $scope.business.field_address.und = [$scope.input.address];

        $scope.business.$update()
        .then(function () {
          $scope.progress = false;
          $scope.editMode = false;
        });
      }
    }

    function cancel() {
      $scope.editMode = false;
    }
  }

}());