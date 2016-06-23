(function () {
  angular
    .module('urbinfo.common')
    .filter('localeString', localeString);

  localeString.$inject = ['locale'];

  function localeString(locale) {
    return function (stringName, replace) {
      var string = locale[stringName];
      if (replace !== undefined) {
        angular.forEach(replace, function (value, key) {
          string = string.replace(key, value);
        });
      }
      return string;
    };
  }
}());
