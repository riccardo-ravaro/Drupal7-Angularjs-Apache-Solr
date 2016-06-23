(function () {
  angular
    .module('urbinfo.common')
    .service('Node', NodeService);

  NodeService.$inject = ['$resource', 'tokenManager'];

  function NodeService($resource, tokenManager) {
    tokenManager.authorize();

    return $resource(Drupal.settings.basePath + 'api/v1/entity_node/:nid', {
      nid: '@nid'
    }, {
      'delete': {
        method: 'DELETE',
        transformRequest: function (data, headersGetter) {
          var headers = headersGetter();
          headers['X-CSRF-Token'] = tokenManager.token;
          return angular.toJson(data);
        }
      },
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
