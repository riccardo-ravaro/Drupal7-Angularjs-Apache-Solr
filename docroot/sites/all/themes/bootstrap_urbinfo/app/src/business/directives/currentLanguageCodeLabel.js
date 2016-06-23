(function () {
  angular
    .module('urbinfo.business')
    .directive('currentLanguageCodeLabel', currentLanguageCodeLabel);

  currentLanguageCodeLabel.$inject = ['language'];

  /**
   * Displays table of business opening hours.
   */
  function currentLanguageCodeLabel(language) {
    return {
      restrict: 'E',
      scope: true,
      template: '<span class="languages__current_language_code">{{ currentLanguageCode }}</span>',
      link: function (scope) {
        scope.currentLanguageCode = language.current.language;
      }
    };
  }

}());