(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('Gallery', Gallery);

  Gallery.$inject = ['$scope', '$document', '$timeout', '$upload', 'language', 'currentNode', 'File', 'tokenManager', 'canEdit', 'ngDialog', 'field'];

  /**
   * Inline editing of gallery on business profile page.
   */
  function Gallery($scope, $document, $timeout, $upload, language, currentNode, File, tokenManager, canEdit, ngDialog, field) {

    var element = angular.element('.gallery');

    if (currentNode.field_gallery.und === undefined) {
      currentNode.field_gallery = {und: []};
    }

    $scope.canEdit = canEdit;
    $scope.allTags = true;
    $scope.tags = [];
    $scope.lang = language.current.language;
    $scope.getType = getType;
    $scope.showFull = false;
    $scope.showDescription = false;
    $scope.selectLang = language.selectFieldLanguage;
    $scope.field = field;
    $scope.editMode = false;
    $scope.showForm = false;
    $scope.selectedFile = null;
    $scope.submitted = false;
    $scope.progress = false;
    $scope.input = {
      type: 'image',
      tags: []
    };
    $scope.editIndex = null;
    $scope.confirmIndex = null;
    $scope.tag = null;
    $scope.slickInPopupOptions = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      onSetPosition: function (slider) {
        $scope.currentSlide = slider.currentSlide;
        $scope.currentItem = currentNode.field_gallery.und[$scope.currentSlide];
        $scope.$apply();
      }
    };
    $scope.galleryShowAllThumbnails = false;

    $scope.showNgDialog = showNgDialog;
    $scope.showGalleryItem = showGalleryItem;
    $scope.galleryShowAllThumbnailsSwitch = galleryShowAllThumbnailsSwitch;
    $scope.thumbVisible = thumbVisible;
    $scope.startEdit = startEdit;
    $scope.add = add;
    $scope.edit = edit;
    $scope.confirmRemove = confirmRemove;
    $scope.remove = remove;
    $scope.onFileSelect = onFileSelect;
    $scope.submit = submit;
    $scope.cancel = cancel;
    $scope.addTag = addTag;
    $scope.removeTag = removeTag;
    $scope.currentNode = currentNode;
    $scope.onKeyPress = onKeyPress;

    getTags();

    $scope.$watch('editMode', function () {
      getTags();
      // Switch to "All" category.
      $timeout(function () {
        element.find('button[ok-sel="*"]').click();
        $scope.refreshIso();
        //console.log(currentNode.field_gallery.und);
        $scope.$broadcast('iso-init', {name: null, params: null});
      }, 100);
    });

    function showNgDialog(index) {
      $scope.slickInPopupOptions.initialSlide = index;
      ngDialog.open({
        template: 'business/views/gallery-dialog.html',
        className: 'ngdialog-theme-urbinfo ngdialog-theme-urbinfo--gallery ngdialog-theme-urbinfo--white-overlay',
        scope: $scope
      });
    }

    function showGalleryItem(index) {
      return !$scope.galleryShowAllThumbnails ? index < 10 : true;
    }

    function galleryShowAllThumbnailsSwitch() {
      //$scope.galleryShowAllThumbnails = true;
      $scope.galleryShowAllThumbnails = !$scope.galleryShowAllThumbnails;
      $timeout(function () {
        $scope.refreshIso();
      });
    }

    function startEdit() {
      $scope.editMode = true;
      // Go straight to add form if no items yet.
      if (!currentNode.field_gallery.und.length) {
        add();
      } else {
        $scope.showForm = false;
      }
    }

    function thumbVisible(i) {
      return element.find('.gallery__thumb').eq(i).is(':visible');
    }

    function getTags() {
      $scope.tags = [];
      angular.forEach(currentNode.field_gallery.und, function (item) {
        angular.forEach(language.selectFieldLanguage(item.field_tags), function (tag) {
          if ($scope.tags.indexOf(tag.value) === -1) {
            $scope.tags.push(tag.value);
          }
        });
      });
    }

    function getType(item) {
      if (item.uri.indexOf('youtube://') === 0) {
        return 'video';
      } else {
        return 'image';
      }
    }

    // Add tag on enter key.
    function onKeyPress(e) {
      if (e.keyCode === 13) {
        addTag();
        e.preventDefault();
      }
    }

    $scope.$watch('input.type', function (newValue) {
      if ($scope.selectedFile && newValue !== getType($scope.selectedFile)) {
        $scope.selectedFile = null;
      }
    });

    $scope.dragEnd = function () {
      currentNode.$update();
    };

    function cancel() {
      $scope.showForm = false;
      $scope.confirmIndex = null;
      // Go straight out of edit mode if there are no items.
      if (!currentNode.field_gallery.und.length) {
        $scope.editMode = false;
      }
    }

    function add() {
      $scope.showForm = true;
      $scope.editIndex = null;
      $scope.selectedFile = null;
      $scope.error = null;
      $scope.submitted = false;
      $scope.progress = false;

      $scope.input = {
        type: 'image',
        tags: []
      };
    }

    function edit(index) {
      $scope.selectedFile = currentNode.field_gallery.und[index];
      $scope.showForm = true;
      $scope.editIndex = index;
      $scope.error = null;
      $scope.submitted = false;
      $scope.progress = false;
      $scope.input = {
        type: getType($scope.selectedFile),
        tags: []
      };

      // Populate input from current file object.
      $scope.input.title = field.getValue($scope.selectedFile.title_field, 0, 'value');
      $scope.input.description = field.getValue($scope.selectedFile.field_description, 0, 'value');

      angular.forEach($scope.selectedFile.field_tags[$scope.lang], function (tag) {
        $scope.input.tags.push(tag.value);
      });
      if ($scope.input.type === 'video') {
        $scope.input.video = $scope.selectedFile.uri.replace('youtube://v/', 'http://www.youtube.com/watch?v=');
      }
    }

    function confirmRemove(index) {
      $scope.confirmIndex = index;
    }

    function remove(index) {
      currentNode.field_gallery.und.splice(index, 1);
      currentNode.$update()
      .then(function () {
        getTags();
      });
      $scope.confirmIndex = null;
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

    function uploadComplete(files) {
      $scope.uploadProgress = false;
      $scope.selectedFile = files[0];
    }

    function submit() {
      var uri;
      $scope.submitted = true;
      $scope.error = null;

      $timeout(function () {

        // Video URL.
        if ($scope.input.type === 'video') {
          if ($scope.input.video.indexOf('youtube') !== -1) {
            uri = $scope.input.video.replace(/https?:\/\/([a-z0-9]+\.)?youtube\.([a-z\.]*?)\/watch\?v=([a-zA-Z0-9_\-]*)[%&=#a-zA-Z0-9_\-]*/, 'youtube://v/$3');
          }

          if (!$scope.selectedFile || $scope.selectedFile.uri !== uri) {
            // Create new file entity.
            $scope.selectedFile = {
              uri: uri,
              url: $scope.input.video,
              title_field: {},
              field_description: {},
              field_tags: {}
            };
          }
        }

        if (!$scope.form.$invalid && !$scope.error) {

          if ($scope.selectedFile) {
            $scope.selectedFile.display = 1;

            // Add any unsubmitted tags.
            if ($scope.input.tag) {
              addTag();
            }

            // Ensure fields are objects. They will be JSON decoded as arrays if empty.
            if (angular.isArray(currentNode.field_gallery)) {
              currentNode.field_gallery = {und: []};
            }
            if (angular.isArray($scope.selectedFile.title_field)) {
              $scope.selectedFile.title_field = {};
            }
            if (angular.isArray($scope.selectedFile.field_description)) {
              $scope.selectedFile.field_description = {};
            }
            if (angular.isArray($scope.selectedFile.field_tags)) {
              $scope.selectedFile.field_tags = {};
            }

            // Populate input values in selected file object.
            $scope.selectedFile.title_field[$scope.lang] = [{
              value: $scope.input.title
            }];
            $scope.selectedFile.field_description[$scope.lang] = [{
              value: $scope.input.description,
              safe_value: $scope.input.description,
              format: 'filtered_html'
            }];
            $scope.selectedFile.field_tags[$scope.lang] = [];
            angular.forEach($scope.input.tags, function (tag) {
              $scope.selectedFile.field_tags[$scope.lang].push({value: tag});
            });

            // Update file entity.
            var file = new File($scope.selectedFile);
            $scope.progress = true;
            file[file.fid ? '$update' : '$save']()
            .then(function success() {
              // Add or replace slide on node's gallery field.
              if ($scope.editIndex !== null) {
                currentNode.field_gallery.und[$scope.editIndex] = file;
              } else {
                currentNode.field_gallery.und.push(file);
              }

              // Update node.
              currentNode.$update()
              .then(function () {
                // Close form.
                cancel();
              });

            }, function error() {
              $scope.error = Drupal.t('This slide could not be added.');
              $scope.progress = false;
            });
          }
        }
      }, 200);
    }

    function addTag() {
      $scope.input.tags.push($scope.input.tag);
      $scope.input.tag = '';
    }

    function removeTag(index) {
      $scope.input.tags.splice(index, 1);
    }
  }

}());
