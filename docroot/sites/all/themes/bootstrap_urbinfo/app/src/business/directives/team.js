(function () {
  angular
    .module('urbinfo.business')
    .directive('team', team);

  team.$inject = ['$document', '$timeout', 'teamMembers', 'canEdit'];

  /**
   * Team members list
   */
  function team($document, $timeout, teamMembers, canEdit) {
    return {
      restrict: 'A',
      templateUrl: 'business/views/team.html',
      link: link
    };

    function link(scope) {


      scope.canEdit = canEdit;
      scope.showFull = false;
      scope.members = teamMembers;

    }
  }
}());
