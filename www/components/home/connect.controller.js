angular.module('starter')

  .controller('ConnectCtrl', function($scope, PostService) {
    $scope.getData = function() {
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
  