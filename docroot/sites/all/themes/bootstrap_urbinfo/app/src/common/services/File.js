(function () {
  angular
    .module('urbinfo.common')
    .service('File', File);

  File.$inject = ['$resource', 'tokenManager'];

  function File($resource, tokenManager) {
    tokenManager.authorize();

    return $resource(Drupal.settings.basePath + 'api/v1/entity_file/:fid', {
      fid: '@fid'
    }, {
      save: {
        method: 'POST',
        transformRequest: function (data, headersGetter) {
          var headers = headersGetter();
          headers['X-CSRF-Token'] = tokenManager.token;
          return angular.toJson(data);
        }
      },
      update: {
        method: 'PUT',
        transformRequest: function (data, headersGetter) {
          var headers = headersGetter();
          headers['X-CSRF-Token'] = tokenManager.token;
          return angular.toJson(data);
        }
      }
    });
  }
}());
