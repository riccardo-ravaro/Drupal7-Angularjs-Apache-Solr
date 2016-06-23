(function () {
  angular
    .module('urbinfo.common')
    .directive('localeString', localeString);

  localeString.$inject = ['locale'];

  function localeString(locale) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      if (locale[attrs.localeString] !== undefined) {
        element.text(locale[attrs.localeString]);
      }
    }
  }
}());
