(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('Team', Team);

  Team.$inject = ['$scope', '$document', '$timeout', '$upload', 'language', 'currentNode', 'FieldCollectionItem', 'tokenManager', 'teamMembers', 'canEdit', 'ngDialog', 'field', 'socialUrls'];

  function Team($scope, $document, $timeout, $upload, language, currentNode, FieldCollectionItem, tokenManager, teamMembers, canEdit, ngDialog, field, socialUrls) {
    var slider,
      element = angular.element('.team');

    $scope.showFull = false;
    $scope.members = teamMembers;
    $scope.selectedItem = null;
    $scope.submitted = false;
    $scope.progress = false;
    $scope.input = {};
    $scope.editMode = false;
    $scope.editIndex = null;
    $scope.confirmIndex = null;
    $scope.canEdit = canEdit;
    $scope.slickInPopupOptions = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    $scope.showItem = showItem;
    $scope.showNgDialog = showNgDialog;
    $scope.close = closeItem;
    $scope.startEdit = startEdit;
    $scope.add = add;
    $scope.edit = edit;
    $scope.onFileSelect = onFileSelect;
    $scope.submit = submit;
    $scope.cancel = cancel;
    $scope.confirmRemove = confirmRemove;
    $scope.remove = remove;
    $scope.dragEnd = dragEnd;

    $scope.slickOptions = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      slide: 'div.slide',
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    $scope.$watch('editMode', function () {
      $timeout(function () {
        $scope.$broadcast('slick-slider-data-updated');
      }, 10);
    });

    function showItem(i) {
      $scope.showFull = true;
      $document.bind('keyup', onKeyUp);

      $timeout(function () {
        slider = element.find('.bxslider').bxSlider({
          startSlide: i,
          pager: false
        });
      }, 10);
    }

    function showNgDialog(index) {
      $scope.slickInPopupOptions.initialSlide = index;
      ngDialog.open({
        template: 'business/views/team-dialog.html',
        className: 'ngdialog-theme-urbinfo ngdialog-theme-urbinfo--team ngdialog-theme-urbinfo--white-overlay',
        scope: $scope
      });
    }

    function closeItem() {
      $scope.showFull = false;
      slider.destroySlider();
      $document.unbind('keyup', onKeyUp);
    }

    function onKeyUp(e) {
      if (e.keyCode === 27) { // Escape key.
        $scope.close();
        $scope.$apply();
      } else if (e.keyCode === 37) { // Left arrow.
        slider.goToPrevSlide();
      } else if (e.keyCode === 39) { // Right arrow.
        slider.goToNextSlide();
      }
    }

    function confirmRemove(index) {
      $scope.confirmIndex = index;
    }

    function dragEnd() {
      currentNode.field_team.und = [];
      angular.forEach($scope.members, function (item) {
        currentNode.field_team.und.push({
          value: item.item_id,
          revision_id: item.revision_id
        });
      });
      currentNode.$update();
    }

    function startEdit() {
      $scope.editMode = true;
      // Go straight to add form if no items yet.
      if (!$scope.members.length) {
        add();
      } else {
        $scope.showForm = false;
      }
    }

    function cancel() {
      $scope.showForm = false;
      $scope.confirmIndex = null;
      // Go straight out of edit mode if there are no items.
      if (!$scope.members.length) {
        $scope.editMode = false;
      }
    }

    function add() {
      $scope.showForm = true;
      $scope.editIndex = null;
      $scope.selectedItem = null;
      $scope.error = null;
      $scope.submitted = false;
      $scope.progress = false;

      $scope.input = {};
    }

    function edit(index) {
      $scope.selectedItem = $scope.members[index];
      $scope.showForm = true;
      $scope.editIndex = index;
      $scope.error = null;
      $scope.submitted = false;
      $scope.progress = false;
      $scope.input = {};

      // Populate input from current field collection item.
      if ($scope.selectedItem.field_image.und !== undefined) {
        $scope.input.image = $scope.selectedItem.field_image.und[0];
      }

      $scope.input.name = field.getValue($scope.selectedItem.field_full_name, 0, 'value');
      $scope.input.role = field.getValue($scope.selectedItem.field_job_title, 0, 'value');
      $scope.input.description = field.getValue($scope.selectedItem.field_description, 0, 'value');
      $scope.input.field_facebook = field.getValue($scope.selectedItem.field_facebook, 0, 'url');
      $scope.input.field_twitter = field.getValue($scope.selectedItem.field_twitter, 0, 'url');
      $scope.input.field_linkedin = field.getValue($scope.selectedItem.field_linkedin, 0, 'url');
      $scope.input.field_googleplus = field.getValue($scope.selectedItem.field_googleplus, 0, 'url');
    }

    function remove(index) {
      $scope.members.splice(index, 1);
      currentNode.field_team.und.splice(index, 1);
      currentNode.$update();
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
      $scope.input.image = files[0];
    }

    function submit() {
      $scope.submitted = true;
      $scope.error = null;

      $timeout(function () {
        if (!$scope.form.$invalid && !$scope.error) {

          if ($scope.input.image) {
            $scope.input.image.display = 1;

            if ($scope.selectedItem === null) {
              $scope.selectedItem = {
                hostEntityId: currentNode.nid,
                hostEntityType: 'node',
                field_name: 'field_team',
                field_image: {},
                field_full_name: {},
                field_job_title: {},
                field_description: {}
              };
            }

            // Ensure optional fields are objects. They will be JSON decoded as arrays if empty.
            if (angular.isArray(currentNode.field_team)) {
              currentNode.field_team = {und: []};
            }
            if (angular.isArray($scope.selectedItem.field_description)) {
              $scope.selectedItem.field_description = {};
            }

            // Populate input values in selected file object.
            $scope.selectedItem.field_image.und = [$scope.input.image];
            $scope.selectedItem.field_full_name.und = [{
              value: $scope.input.name
            }];
            $scope.selectedItem.field_job_title[$scope.lang] = [{
              value: $scope.input.role
            }];
            $scope.selectedItem.field_description[$scope.lang] = [{
              value: $scope.input.description,
              safe_value: $scope.input.description,
              format: 'filtered_html'
            }];

            $scope.selectedItem.field_facebook = {und: [{url: socialUrls.makeUrl($scope.input.field_facebook, 'facebook')}]};
            $scope.selectedItem.field_twitter = {und: [{url: socialUrls.makeUrl($scope.input.field_twitter, 'twitter')}]};
            $scope.selectedItem.field_linkedin = {und: [{url: socialUrls.makeUrl($scope.input.field_linkedin, 'linkedin')}]};
            $scope.selectedItem.field_googleplus = {und: [{url: socialUrls.makeUrl($scope.input.field_googleplus, 'googleplus')}]};

            // Update field collection item entity.
            var item = new FieldCollectionItem($scope.selectedItem);
            $scope.progress = true;
            item[item.item_id ? '$update' : '$save']()
            .then(function success() {
              // Add or replace item
              if ($scope.editIndex !== null) {
                $scope.members[$scope.editIndex] = item;
                cancel();

              } else {
                $scope.members.push(item);
                currentNode.field_team.und.push({
                  value: item.item_id,
                  revision_id: item.revision_id
                });

                // Update node.
                currentNode.$update()
                .then(function () {
                  // Close form.
                  cancel();
                });
              }

            }, function error() {
              $scope.error = Drupal.t('This team member could not be added.');
              $scope.progress = false;
            });
          }
        }
      }, 200);
    }
  }

}());