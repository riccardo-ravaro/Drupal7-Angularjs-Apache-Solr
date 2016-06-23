(function () {
  angular
    .module('urbinfo.common')
    .factory('editorSettings', editorSettings);

  function editorSettings() {
    var options = Drupal.settings.urbinfo.ckeditorProfile.settings;
    //options.toolbar = eval(options.toolbar);
    options.height = '150px';
    return options;
  }
}());
