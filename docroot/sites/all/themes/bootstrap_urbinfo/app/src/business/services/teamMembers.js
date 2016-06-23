(function () {
  angular
    .module('urbinfo.business')
    .factory('teamMembers', teamMembers);

  function teamMembers() {
    return Drupal.settings.urbinfo.teamMembers;
  }
}());
