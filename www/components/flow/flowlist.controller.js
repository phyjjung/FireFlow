angular.module('starter')

  .controller('FlowCtrl', function($scope,FlowListService, $stateParams,userflowlist,Auth) {
$suthuid = Auth.uid;
console.log(Auth.uid);
$scope.flowlist2=userflowlist.getflowlist('NyRMDzW79ncYvIgu5qvyBbzKmv93') ;


  //  $scope.flowlist2 = userflowlist;
    console.log($scope.flowlist2);

    $scope.getData = function() {
      FlowListService.query()
        .then(function(response) {
          $scope.results = $scope.flowlist2;
          //  $scope.results = response; 원래 이렇게 되어있었음.. response는 servce에서 정의되어있던 data임. 거기다 flowlist를 붙혀줌
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    //////////////////
    $scope.getData();
  });
