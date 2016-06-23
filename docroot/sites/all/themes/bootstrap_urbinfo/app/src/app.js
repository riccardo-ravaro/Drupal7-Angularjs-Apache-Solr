(function () {
  'use strict';

  angular.module('urbinfo', [
    'urbinfo.search',
    'urbinfo.business',
    'urbinfo.login',
    'urbinfo.vendors'
  ])

  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
  });

}());
