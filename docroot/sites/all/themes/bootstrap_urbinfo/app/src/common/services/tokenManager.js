(function () {
  angular
    .module('urbinfo.common')
    .service('tokenManager', tokenManager);

  tokenManager.$inject = ['$http'];

  function tokenManager($http) {
    var self = this;
    this.authorize = authorize;
    this.fetchToken = fetchToken;
    this.getUrbinfoToken = getUrbinfoToken;
    this.token = null;

    function authorize() {
      if (!this.token) {
        this.fetchToken();
      }
    }

    function fetchToken() {
      $http({method: 'GET', url: Drupal.settings.basePath + 'services/session/token'})
      .success(function (response) {
        self.token = response;
      });
    }

    function getUrbinfoToken() {
      return Math.random().toString(36).substr(2);
    }

  }
}());
