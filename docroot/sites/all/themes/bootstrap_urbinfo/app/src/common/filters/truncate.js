(function () {
  angular
    .module('urbinfo.common')
    .filter('truncate', truncate);

  /**
   * Truncate text to characters / word limit.
   *
   * Usage:
   *
   * {{some_text | cut:true:100:' ...'}}
   *
   * Options:
   *
   * wordwise (boolean) - if true, cut only by words bounds,
   * max (integer) - max length of the text, cut to this number of chars,
   * tail (string, default: ' …') - add this string to the input string if the string was cut.
   */
  function truncate() {
    return function (value, wordwise, max, tail) {
      if (!value) {
        return '';
      }

      // Strip tags.
      value = value.replace(/(<([^>]+)>)/ig, '');

      max = parseInt(max, 10);
      if (!max) {
        return value;
      }

      if (value.length <= max) {
        return value;
      }

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  }
}());
