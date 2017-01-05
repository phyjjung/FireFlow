angular.module('starter')

  .controller('FlowCtrl', function($scope,FlowListService, PostService, $stateParams,flowlist,userflowlist) {
    $scope.flowlist = flowlist;
    console.log($scope.flowlist);

    $scope.getData = function() {
      FlowListService.query()
        .then(function(response) {
          $scope.results = $scope.flowlist;
          //  $scope.results = response; 원래 이렇게 되어있었음.. response는 servce에서 정의되어있던 data임. 거기다 flowlist를 붙혀줌
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
