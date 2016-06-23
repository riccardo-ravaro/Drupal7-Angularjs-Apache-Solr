(function () {
  angular
    .module('urbinfo.common')
    .directive('preventDefault', preventDefault);

  function preventDefault() {
    return {
      restrict: 'A',
      link: function (scope, element) {
        window.$(element).click(function (event) {
          event.preventDefault();
        });
      }
    };

  }
}());
