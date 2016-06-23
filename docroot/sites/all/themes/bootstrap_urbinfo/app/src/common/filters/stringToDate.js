(function () {
  angular
    .module('urbinfo.common')
    .filter('stringToDate', stringToDate);

  /**
   * Convert string to date.
   *
   * Usage:
   *
   * {{ date string | stringToDate | date:'medium' }}
   *
   * Use it before date filter to make sure your date is formattable.
   */
  function stringToDate() {
    return function (value) {
      if (value && value !== undefined) {
        // A hack to try to convert value into ISO 8601:2004
        // because Safari needs dates to be in that format
        // we assume that 'T' is missing between date and time
        // so if we can split date in two parts by space, that means
        // we can insert T instead of this space, like this:
        // 22-12-2014 01:00:00 converts to 22-12-2014T01:00:00
        var value_parts = value.split(' ');
        if (value_parts.length === 2) {
          value = value_parts.join('T');
        }
      }
      return new Date(value);
    };
  }
}());
