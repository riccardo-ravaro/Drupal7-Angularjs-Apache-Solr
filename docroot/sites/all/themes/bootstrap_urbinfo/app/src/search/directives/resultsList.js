(function () {
  angular
    .module('urbinfo.search')
    .directive('resultsList', resultsList);

  resultsList.$inject = ['$timeout', 'config'];

  /**
   * Search results list
   */
  function resultsList($timeout, config) {
    return {
      restrict: 'A',
      templateUrl: 'search/views/results-list.html',
      link: link
    };

    function link($scope, element) {
      // Scroll to item on popup open.
      $scope.$watch('state.activeIndex', function () {
        if ($scope.search.results.length) {
          $timeout(scrollToActive, 100);
        }
      });

      // Set hover color on markers
      element.on('mouseover', '.search-result', function () {
        var hoverIndex = angular.element(this).index('.search-results__list .search-result');
        $scope.map.markers[hoverIndex].icon.markerColor = config.map.markerColorActive;
        $scope.$apply();
      })
      .on('mouseout', '.search-result', function () {
        var hoverIndex = angular.element(this).index('.search-results__list .search-result');
        $scope.map.markers[hoverIndex].icon.markerColor = config.map.markerColor;
        $scope.$apply();
      });

      $scope.$on('search.updated', function () {
        element.animate({scrollTop: 0});
      });

      /**
       * Scroll to active item.
       */
      function scrollToActive() {
        var $items = angular.element('.search-results__list .search-result'),
          top = $items.eq($scope.state.activeIndex).position().top - $items.eq(0).position().top;
        element.animate({scrollTop: top + 'px'});
      }
    }
  }
}());
