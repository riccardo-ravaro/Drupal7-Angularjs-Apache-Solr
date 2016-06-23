(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('ProfileInfo', ProfileInfo);

  ProfileInfo.$inject = ['$scope', 'language', 'currentNode', 'tokenManager', '$upload', 'field'];

  /**
   * Inline editing of main details on business profile page.
   */
  function ProfileInfo($scope, language, currentNode, tokenManager, $upload, field) {

    // Scope variables.
    $scope.editMode = false;
    $scope.progress = false;
    $scope.submitted = false;
    $scope.input = {};

    // Scope methods.
    $scope.businessInfoIsEmpty = businessInfoIsEmpty;
    $scope.edit = edit;
    $scope.save = save;
    $scope.cancel = cancel;
    $scope.getInput = getInput;
    $scope.prepareFacilities = prepareFacilities;

    // Scope methods definition.
    // File upload
    $scope.onFileSelect = onFileSelect;
    $scope.removeMenuFile = removeMenuFile;

    function onFileSelect($files) {
      $scope.uploadProgress = true;

      $scope.upload = $upload.upload({
        url: Drupal.settings.basePath + 'api/v1/entity_file/create_raw',
        method: 'POST',
        headers: {'X-CSRF-Token': tokenManager.token},
        data: {},
        file: $files[0]
      })

      .success(function (files) {
        files[0].display = 1;
        $scope.input.field_menu = files[0];
      });
    }

    function removeMenuFile() {
      $scope.input.field_menu = [];
    }

    /**
     * Checks if at least one business info related field is not empty.
     */
    function businessInfoIsEmpty() {
      var input_fields = $scope.getInput();
      for (var field_name in input_fields) {
        if (input_fields[field_name] !== undefined && input_fields[field_name] !== null) {
          return false;
        }
      }

      if ($scope.business.field_facilities.und !== undefined) {
        return false;
      }

      return true;
    }

    /**
     * Prepares variables for inputs.
     */
    function getInput() {
      return {
        telephone: field.getValue($scope.business.field_telephone, 0, 'value'),
        email: field.getValue($scope.business.field_email, 0, 'email'),
        average_price: field.getValue($scope.business.field_average_price, 0, 'value'),
        field_menu: field.getValue($scope.business.field_menu, 0)
      };
    }

    /**
     * Facilities are checkboxes, so we need to create a key value pair of tid:bool for every facility.
     */
    function prepareFacilities() {
      // Prepare facilities checkbox values.
      var facilities = {};
      for (var index in $scope.facilities) {
        if ($scope.facilities[index] !== undefined) {
          facilities[index] = false;
          for (var delta in $scope.business.field_facilities.und) {
            if ($scope.business.field_facilities.und[delta].tid === index) {
              facilities[index] = true;
              break;
            }
          }
        }
      }
      return facilities;
    }

    // Edit, save, cancel methods.
    function edit() {
      $scope.editMode = true;
      $scope.progress = false;
      $scope.submitted = false;
      $scope.input = $scope.getInput();
      $scope.input.facilities = $scope.prepareFacilities();
    }

    function save() {
      $scope.submitted = true;
      if (!$scope.form.$invalid) {
        $scope.progress = true;
        $scope.business.field_telephone = {und: [{value: $scope.input.telephone}]};
        $scope.business.field_email = {und: [{email: $scope.input.email}]};
        $scope.business.field_average_price = {und: [{value: $scope.input.average_price}]};
        $scope.business.field_menu = {und: [$scope.input.field_menu]};

        // Facilities are checkboxes, thus need a bit of special handling.
        var tids = [];
        for (var tid in $scope.input.facilities) {
          if ($scope.input.facilities[tid] === true) {
            tids.push({tid: tid});
          }
        }
        $scope.business.field_facilities = {und: tids};

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