(function () {
  angular
    .module('urbinfo.business')
    .filter('filterSpecialsByDate', filterSpecialsByDate);

  filterSpecialsByDate.$inject = ['$filter'];

  /**
   * Genrate thumbnail image URL for image.
   */
  function filterSpecialsByDate($filter) {
    return function (items) {
      var retn = [];

      angular.forEach(items, function (item) {
        if (item.field_valid_till === undefined || item.field_valid_till.und === undefined || item.field_valid_till.und[0] === undefined || item.field_valid_till.und[0].value === null || $filter('stringToDate')(item.field_valid_till.und[0].value) >= new Date()) {
          retn.push(item);
        }
      });

      return retn;
    };
  }
}());