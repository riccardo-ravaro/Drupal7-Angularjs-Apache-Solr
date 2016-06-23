(function () {
  angular
    .module('urbinfo.business')
    .factory('teamMembersRequest', teamMembersRequest);

  teamMembersRequest.$inject = ['$http'];

  function teamMembersRequest($http) {
    return {
      getForBusiness: getForBusiness
    };
    function getForBusiness(businessId) {
      return $http({
        url: '/ajax/urbinfo-team/' + businessId,
        method: 'GET'
      });
    }
  }
}());
