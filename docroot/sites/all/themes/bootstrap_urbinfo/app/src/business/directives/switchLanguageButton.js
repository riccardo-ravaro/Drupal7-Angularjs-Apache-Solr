(function () {
  angular
    .module('urbinfo.business')
    .directive('switchLanguageButton', switchLanguageButton);

  switchLanguageButton.$inject = ['$window', 'language', 'field', 'switchLanguageStateService'];

  /**
   * Displays switch language button.
   */
  function switchLanguageButton($window, language, field, switchLanguageStateService) {
    return {
      restrict: 'E',
      templateUrl: 'business/views/switch-language-button.html',
      scope: {
        name: '=fieldName',
        field: '=field',
        obj: '=obj'
      },
      link: function (scope) {
        scope.switchLanguage = function () {
          switchLanguageStateService.setDataFromScope(scope);
        };
      }

    };
  }

}());