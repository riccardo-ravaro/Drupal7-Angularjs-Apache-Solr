(function () {
  angular
    .module('urbinfo.common')
    .service('FieldCollectionItem', FieldCollectionItem);

  FieldCollectionItem.$inject = ['$resource', 'tokenManager'];

  function FieldCollectionItem($resource, tokenManager) {
    tokenManager.authorize();

    return $resource(Drupal.settings.basePath + 'api/v1/entity_field_collection_item/:item_id', {
      item_id: '@item_id'
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
