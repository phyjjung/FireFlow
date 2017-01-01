angular.module('starter')

  .controller('AuthCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, Auth) {
    // Modal
    $scope.user = {};

    $ionicModal.fromTemplateUrl('components/auth/views/login.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    $scope.openLogin = function() {
      $scope.loginModal.show();
    };

    $scope.closeLogin = function() {
      $scope.loginModal.hide();
    };

    $scope.login = function() {


    // Setup the loader
$ionicLoading.show({
  content: '<div class="ionic-logo"></div>',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});
    Auth.$signInWithEmailAndPassword($scope.user.email,$scope.user.password)
    .then( function(Auth) {
$ionicLoading.hide();
$scope.closeLogin();
    	$state.go('tab.home');

    }
    ,function (error) {
    	$scope.error=true;
    	switch (error.code) {
    		case "auth/user-not-found" :  $scope.message = "등록된 사용자가 없습니다." ; break;
    		case "auth/wrong-password" :  $scope.message = "잘못된 비밀번호입니다." ; break;
    		case "auth/invalid-email" :  $scope.message = "잘못된 email형식입니다." ; break;
    		default : $scope.message = error.code ; break;
    	};
    	$ionicLoading.hide();
    }
    );


    }
  });
