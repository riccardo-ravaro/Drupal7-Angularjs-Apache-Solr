(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('ProfileDescription', ProfileDescription);

  ProfileDescription.$inject = ['$scope', '$timeout', 'language', 'currentNode', 'field', 'entityTranslation'];

  /**
   * Inline editing of description on business profile page.
   */
  function ProfileDescription($scope, $timeout, language, currentNode, field, entityTranslation) {
    $scope.editMode = false;
    $scope.progress = false;
    $scope.submitted = false;

    $scope.input = {};

    $scope.startEdit = startEdit;
    $scope.save = save;
    $scope.cancel = cancel;

    function startEdit() {
      $scope.input = {
        description: field.getValue(currentNode.body, 0, 'value')
      };
      $scope.editMode = true;
      $scope.progress = false;
      $scope.submitted = false;
    }

    function save() {
      $scope.submitted = true;

      // Timeout needed for CKEditor to update model on blur.
      $timeout(function () {
        if (!$scope.form.$invalid) {
          $scope.progress = true;

          // Make sure field is an object.
          if (angular.isArray(currentNode.body)) {
            currentNode.body = {};
          }

          currentNode.body[$scope.lang] = [{
            value: $scope.input.description,
            safe_value: $scope.input.description,
            format: 'filtered_html'
          }];

          entityTranslation.setTranslation(currentNode);
          currentNode.$update()
          .then(function () {
            $scope.progress = false;
            $scope.editMode = false;
          });
        }
      }, 200);
    }

    function cancel() {
      $scope.editMode = false;
    }
  }

}());
