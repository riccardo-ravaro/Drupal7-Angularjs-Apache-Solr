(function () {
  angular
    .module('urbinfo.business')
    .directive('switchLanguageNote', switchLanguageNote);

  switchLanguageNote.$inject = ['language', 'field', 'switchLanguageStateService'];

  /**
   * Displays switch language note inside an inline edit.
   */
  function switchLanguageNote(language, field, switchLanguageStateService) {
    return {
      restrict: 'E',
      templateUrl: 'business/views/switch-language-note.html',
      scope: {
        name: '=fieldName',
        field: '=field',
        helpText: '=helpText',
        helpTextHeader: '=helpTextHeader'
      },
      link: function (scope) {

        scope.switchLanguage = function () {
          switchLanguageStateService.setDataFromScope(scope);
        };

      }
    };
  }

}());