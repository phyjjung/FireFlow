angular.module('starter')

  .controller('NotificationsCtrl', function($scope, NotificationsService) {
    $scope.getData = function() {
      NotificationsService.getAll()
        .then(function(response) {
          $scope.posts = response;

          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    //////////////////
    $scope.getData();
  });
  