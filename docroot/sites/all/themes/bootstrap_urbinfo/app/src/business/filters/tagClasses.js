(function () {
  angular
    .module('urbinfo.business')
    .filter('tagClasses', tagClasses);

  /**
   * Genrate class names from tag label(s).
   */
  function tagClasses() {
    return function (tags) {
      if (angular.isArray(tags)) {
        var classes = [];
        angular.forEach(tags, function (tag) {
          classes.push(getClassName(tag.value));
        });
        return classes;
      } else if (angular.isString(tags)) {
        return getClassName(tags);
      } else {
        return getClassName(tags.value);
      }
    };
  }

  function getClassName(label) {
    return 'tag-' + label.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }
}());
