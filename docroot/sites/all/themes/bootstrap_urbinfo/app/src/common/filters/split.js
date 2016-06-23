(function () {
  angular
    .module('urbinfo.common')
    .filter('split', split);

  /**
   * Split a string into an array. Optionally fetch a specific key.
   */
  function split() {
    return function (input, splitChar, splitIndex) {
      if (angular.isString(input)) {
        if (splitIndex !== undefined) {
          return input.split(splitChar)[splitIndex];
        } else {
          return input.split(splitChar);
        }
      }
    };
  }
}());
