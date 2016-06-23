(function () {
  angular
    .module('urbinfo.common')
    .factory('currentNode', currentNode);

  currentNode.$inject = ['Node'];

  function currentNode(Node) {
    var node = new Node(Drupal.settings.urbinfo.node);
    return node;
  }
}());
