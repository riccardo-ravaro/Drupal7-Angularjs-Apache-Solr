(function () {
  angular
    .module('urbinfo.business')
    .factory('switchLanguageStateService', switchLanguageStateService);

  /**
   * Service that holds state for language switch popup.
   */
  function switchLanguageStateService() {
    var state = {};
    return {
      getData: function () {
        return state;
      },
      setData: function (data) {
        state = data;
      },
      setDataFromScope: function (scope) {
        this.setData({
          name: scope.name,
          field: scope.field,
          obj: scope.obj,
          type: (scope.obj === undefined) ? 'field' : 'object'
        });
      },
      resetData: function () {
        state = {};
      }
    };
  }
}());
