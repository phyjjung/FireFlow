angular.module('starter')

  .controller('SearchCtrl', function($scope, SearchService, PostService, $stateParams) {
    $scope.getData = function() {
      SearchService.query()
        .then(function(response) {
          $scope.results = response;

          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    if ($stateParams.q) {
      $scope.currentQuery = $stateParams.q;

      PostService.getAll()
        .then(function(response) {
          $scope.posts = response;

          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    //////////////////
    $scope.getData();
  });
  