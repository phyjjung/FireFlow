angular.module('starter')

  .controller('TweetCtrl', function($scope, PostService) {
    $scope.getData = function() {
      PostService.getAll()
        .then(function(response) {
          $scope.post = response[0]; // This single tweet

          $scope.posts = response; // Dummy replies

          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    //////////////////
    $scope.getData();
  });
  