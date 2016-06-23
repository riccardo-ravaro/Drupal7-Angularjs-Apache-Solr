(function () {
  'use strict';

  // Fix for naughty jQuery plugins.
  window.$ = window.jQuery;

  angular.module('urbinfo.business', [
    'ui.bootstrap',
    'ngSanitize',
    'ngResource',
    'iso.directives',
    'angularFileUpload',
    'ui.sortable'
  ])

  .factory('canEdit', function () {
    return Drupal.settings.urbinfo.canEdit;
  });

}());
