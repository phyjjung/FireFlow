angular.module('starter')

  .controller('AuthCtrl', function ($scope, $ionicModal, $ionicLoading, $timeout, $state, Auth,$ionicPopup) {
    // Modal
    $scope.user = {};

    $ionicModal.fromTemplateUrl('components/auth/views/login.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.loginModal = modal;
    });

    $ionicModal.fromTemplateUrl('components/auth/views/signup.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.signupModal = modal;
    });

    $scope.openLogin = function () {
      $scope.loginModal.show();
    };

    $scope.openSignup = function() {
      $scope.loginModal.hide();
      $scope.signupModal.show();
    }

    $scope.closeLogin = function () {
      $scope.loginModal.hide();
    };

    $scope.closeSignup = function () {
      $scope.signupModal.hide();
    }
    $scope.login = function () {
      // Setup the loader
      $ionicLoading.show({
        content: '<div class="ionic-logo"></div>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });


      if( !$scope.user || !$scope.user.email || !$scope.user.password){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Login failed.',
          template: 'Please check your credentials!'
        });
        return;
      }

      Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
        .then(function (Auth) {
            $ionicLoading.hide();
            $scope.closeLogin();
            $state.go('tab.home');
          }).catch(function (error) {
            $scope.error = true;
            switch (error.code) {
              case "auth/user-not-found" :
                $scope.message = "등록된 사용자가 없습니다.";
                break;
              case "auth/wrong-password" :
                $scope.message = "잘못된 비밀번호입니다.";
                break;
              case "auth/invalid-email" :
                $scope.message = "잘못된 email형식입니다.";
                break;
              default :
                $scope.message = error.code;
                break;
            };
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Login failed!',
              template: $scope.message
            });
          }
        );
    }
    $scope.signup = function() {
      $ionicLoading.show({
        content: '<div class="ionic-logo"></div>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      if( !$scope.user || !$scope.user.email || !$scope.user.password || !$scope.user.repeat_password){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Sign up failed.',
          template: 'Please check your credentials!'
        });
        return;
      }

      if($scope.user.password != $scope.user.repeat_password) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Sign up failed',
          template: 'Password not match'
        });
        return;
      }

      Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
        .then(function (Auth) {
          console.log("가입 성공");
          $ionicLoading.hide();
          $scope.closeSignup();
          $state.go('tab.home');
        }).catch(function (error) {
          $scope.error = true;
          switch (error.code) {
            case "auth/invalid-email" :
              $scope.message = "잘못된 email형식입니다.";
              break;
            case "auth/weak-password" :
              $scope.message = "비밀번호가 너무 쉽습니다.";
              break;
            case "auth/email-already-in-use" :
              $scope.message = "이미 사용중인 email 주소입니다.";
              break;
            default :
              $scope.message = error.code;
              break;
          };
          console.log($scope.message);
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sing up failed!',
            template: $scope.message
          });
        }
      );
    }
  });
