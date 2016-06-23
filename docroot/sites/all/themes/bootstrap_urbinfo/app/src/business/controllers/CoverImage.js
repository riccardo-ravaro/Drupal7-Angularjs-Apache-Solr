(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('CoverImage', CoverImage);

  CoverImage.$inject = ['$scope', '$upload', 'currentNode', 'tokenManager'];

  /**
   * Inline editing of profile cover image.
   */
  function CoverImage($scope, $upload, currentNode, tokenManager) {
    $scope.onFileSelect = onFileSelect;
    $scope.remove = remove;
    $scope.confirm = false;

    function uploadComplete(files) {
      $scope.uploadProgress = false;
      files[0].display = 1;
      currentNode.field_cover_image = {
        und: [files[0]]
      };
      currentNode.$update();
    }

    function remove() {
      currentNode.field_cover_image = {};
      currentNode.$update();
      $scope.confirm = false;
    }

    function onFileSelect($files) {
      $scope.uploadProgress = true;

      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: Drupal.settings.basePath + 'api/v1/entity_file/create_raw',
          method: 'POST',
          headers: {'X-CSRF-Token': tokenManager.token},
          data: {},
          file: file
        })
        .success(uploadComplete);
      }
    }
  }

}());
