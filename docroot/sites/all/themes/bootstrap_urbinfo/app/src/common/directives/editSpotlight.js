(function () {
  angular
    .module('urbinfo.common')
    .directive('editSpotlight', editSpotlight);

  editSpotlight.$inject = ['$document'];

  function editSpotlight($document) {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'common/views/edit-spotlight.html',
      scope: {
        visible: '=editSpotlight',
        showDoneBtn: '=editSpotlightDoneBtn'
      },
      link: link
    };

    function link(scope, element) {
      scope.$watch('visible', function () {
        element.addClass('edit-spotlight');
        if (scope.visible) {
          element.addClass('is-visible');
        } else {
          element.removeClass('is-visible');
        }
      });

      scope.doneEditing = function () {
        scope.visible = false;
        scope.$parent.showForm = false;
        if (scope.$parent.doneEditing !== undefined) {
          scope.$parent.doneEditing();
        }
      };

      $document.bind('keyup', onKeyUp);

      function onKeyUp(e) {
        if (e.keyCode === 27) { // Escape key.
          scope.doneEditing();

        }
      }

      element.find('.edit-spotlight__mask').click(function () {
        scope.doneEditing();
      });
    }
  }
}());
