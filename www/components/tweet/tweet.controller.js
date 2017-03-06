angular.module('starter')

  .controller('TweetCtrl', function($scope, PostService) {
    $scope.getData = function() {


      PostService.getAll()
        .then(function(response) {
          $scope.post = response[0]; // This single tweet

          $scope.posts = response; // Dummy replies
          console.log("TweetCtrl에 들러옴 이건 빅임. 즉 포스트와 댓글영역");
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    //////////////////
    $scope.getData();
  });
