angular.module('starter')

  .controller('ProfileCtrl', function($scope,profile, NotificationsService, Auth, $ionicPopup,Users,$state) {
    $scope.Auth = Auth;
     $scope.profile= profile;
    



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
    $scope.signout = function(){
      var confirmPopup = $ionicPopup.confirm({
		title: 'Log Out',
		template: 'Log Out하시겠습니까?'
	});
  confirmPopup.then(function(res) {

  if(res) {
    $scope.Auth.$signOut().then (function (){
      $state.go('onboarding');
      console.log('sign out합니다.');
    });


  } else {

    console.log('sign out안 합니다.');
  }
});

    };
  });
