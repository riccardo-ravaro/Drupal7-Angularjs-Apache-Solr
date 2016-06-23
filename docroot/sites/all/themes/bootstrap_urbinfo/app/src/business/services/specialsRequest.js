(function () {
  angular
    .module('urbinfo.business')
    .factory('specialsRequest', specialsRequest);

  specialsRequest.$inject = ['$http'];

  function specialsRequest($http) {
    return {
      getForBusiness: getForBusiness
    };
    function getForBusiness(businessId) {
      return $http({
        url: '/ajax/urbinfo-specials/' + businessId,
        method: 'GET'
      });
    }
  }
}());
