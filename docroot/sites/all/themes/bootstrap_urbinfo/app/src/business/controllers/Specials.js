(function () {
  'use strict';

  angular
    .module('urbinfo.business')
    .controller('Specials', Specials);

  Specials.$inject = ['$scope', '$upload', '$timeout', 'specials', 'language', 'currentNode', 'Node', 'tokenManager', 'ngDialog', 'field', '$filter', 'entityTranslation'];

  function Specials($scope, $upload, $timeout, specials, language, currentNode, Node, tokenManager, ngDialog, field, $filter, entityTranslation) {
    $scope.specials = specials;
    $scope.selectedItem = null;
    $scope.submitted = false;
    $scope.progress = false;
    $scope.input = {};
    $scope.editMode = false;
    $scope.editIndex = null;

    $scope.startEdit = startEdit;
    $scope.add = add;
    $scope.edit = edit;
    $scope.onFileSelect = onFileSelect;
    $scope.submit = submit;
    $scope.cancel = cancel;
    $scope.remove = remove;
    $scope.removeImage = removeImage;
    $scope.specialsUrl = specialsUrl;

    $scope.$watch('editMode', function () {
      $timeout(function () {
        $scope.$broadcast('slick-slider-data-updated');
      }, 10);
    });

    function specialsUrl(special) {
      var prefix = '/' + language.current.language;
      if (language.current.language === 'en') {
        prefix = '';
      }
      return  prefix + '/node/' + special.nid;
    }

    function startEdit() {
      $scope.editMode = true;
      $scope.showForm = !specials.length;
    }

    function cancel() {
      $scope.showForm = false;
      if (!specials.length) {
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
      $scope.selectedItem = $scope.specials[index];
      $scope.showForm = true;
      $scope.editIndex = index;
      $scope.error = null;
      $scope.submitted = false;
      $scope.progress = false;
      $scope.input = {};

      // Populate input from current field collection item.
      $scope.input.image = null;
      if ($scope.selectedItem.field_image.und !== undefined) {
        $scope.input.image = $scope.selectedItem.field_image.und[0];
      }

      $scope.input.title = field.getValue($scope.selectedItem.title_field, 0, 'value');
      $scope.input.description = field.getValue($scope.selectedItem.body, 0, 'value');
      $scope.input.valid_till = field.getValue($scope.selectedItem.field_valid_till, 0, 'value');
    }

    function remove(index) {
      if (confirm(Drupal.t('Are you sure you want to remove this special?'))) {
        new Node($scope.specials[index]).$delete();
        $scope.specials.splice(index, 1);
      }
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

    function removeImage() {
      $scope.input.image = null;
    }

    function submit() {
      $scope.submitted = true;
      $scope.error = null;

      // Timeout needed for CKEditor to update model on blur.
      $timeout(function () {
        if (!$scope.form.$invalid && !$scope.error && $scope.input.image) {

          if ($scope.selectedItem === null) {
            $scope.selectedItem = {
              type: 'promotion',
              og_group_ref: {und: [{target_id: currentNode.nid}]}
            };
          }

          // Ensure all fields are objects. They will be JSON decoded as arrays if empty.
          if ($scope.selectedItem.field_image === undefined || angular.isArray($scope.selectedItem.field_image)) {
            $scope.selectedItem.field_image = {};
          }
          if ($scope.selectedItem.body === undefined || angular.isArray($scope.selectedItem.body)) {
            $scope.selectedItem.body = {};
          }
          if ($scope.selectedItem.title_field === undefined || angular.isArray($scope.selectedItem.title_field)) {
            $scope.selectedItem.title_field = {};
          }

          // Populate input values in selected node object.
          if ($scope.input.image) {
            $scope.selectedItem.field_image.und = [$scope.input.image];
          } else {
            $scope.selectedItem.field_image.und = [];
          }
          $scope.selectedItem.title_field[$scope.lang] = [{
            value: $scope.input.title
          }];
          $scope.selectedItem.body[$scope.lang] = [{
            value: $scope.input.description,
            safe_value: $scope.input.description,
            format: 'filtered_html'
          }];

          if ($scope.input.valid_till !== undefined) {
            $scope.selectedItem.field_valid_till = {und: [{value: $filter('date')($scope.input.valid_till, 'yyyy-MM-dd HH:mm')}]};
          }
          else {
            $scope.selectedItem.field_valid_till = [];
          }

          // Update field collection item node.
          var item = new Node($scope.selectedItem);
          entityTranslation.setTranslation(item);
          //nodePrepare.attachMissingInfo(item);

          $scope.progress = true;

          item[item.nid ? '$update' : '$save']()
          .then(function success() {
            // Add or replace item
            if ($scope.editIndex !== null) {
              specials[$scope.editIndex] = item;
            } else {
              specials.push(item);
            }
            $scope.$broadcast('specials-updated');
            cancel();
          }, function error() {
            $scope.error = Drupal.t('This special could not be added.');
            $scope.progress = false;
          });
        }
      }, 200);


    }

    $scope.slickOptions = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
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
      ],
      onSetPosition: function () {
        /* $timeout(function () {
          var max_height = 0;

          window.$('.specials--slider .slick-active').each(function () {
            window.$(this).css('height', 'auto');
          });


          window.$('.specials--slider .slick-active').each(function () {
            if (window.$(this).height() > max_height) {
              max_height = window.$(this).height();
            }
          });

          window.$('.specials--slider .slick-active').each(function () {
            window.$(this).css('height', max_height);
          });

        });
        */
      }
    };

    $scope.slickInPopupOptions = {
      dots: false,
      infinite: false,
      speed: 300,
      adaptiveHeight: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    $scope.showNgDialog = function (index) {
      $scope.slickInPopupOptions.initialSlide = index;
      ngDialog.open({
        template: 'business/views/specials-dialog.html',
        className: 'ngdialog-theme-urbinfo ngdialog-theme-urbinfo--specials',
        scope: $scope
      });
    };



  }

}());
