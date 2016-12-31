angular.module('starter')

  .controller('AuthCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state) {
    // Modal
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
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });

      $timeout(function() {
        $ionicLoading.hide();
        $scope.closeLogin();
        $state.go('tab.home');
      }, 2000);
    }
  });
  