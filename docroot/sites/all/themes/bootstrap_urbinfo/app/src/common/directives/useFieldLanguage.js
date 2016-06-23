(function () {
  angular
    .module('urbinfo.common')
    .directive('useFieldLanguage', useFieldLanguage);

  useFieldLanguage.$inject = ['language'];

  /**
   * Set element lang and dir attributes if field is not in current langage.
   */
  function useFieldLanguage(language) {
    return {
      restrict: 'A',
      scope: {
        field: '=useFieldLanguage'
      },
      link: link
    };

    function link(scope, element) {
      var lang = language.getFieldLanguage(scope.field);

      if (lang.language !== language.current.language && lang !== 'und') {
        element.attr('lang', lang.language);
      }
      if (lang.direction !== language.current.direction && lang !== 'und') {
        element.attr('dir', lang.direction === '1' ?  'rtl' : 'ltr');
      }
    }
  }
}());
