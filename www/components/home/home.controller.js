angular.module('starter')

  .controller('HomeCtrl', function($scope, $ionicModal, PostService) {
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


///new_tweet modal 시작
    $ionicModal.fromTemplateUrl('components/tweet/views/new_tweet.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.open_new_tweet = function() {
      $scope.modal.show();
    };
    $scope.close = function() {
      $scope.modal.hide();
    };

    $scope.addGif = function() {
      Giphy.openModal()
        .then(function(imageUrl) {
          $scope.tweet.imgSrc = imageUrl;
        })
    }

    $scope.addPhoto = function() {
      PhotoService.add()
        .then(function(imageData) {
          $scope.tweet.imgSrc = imageData;
        })
    }

    $scope.addLocation = function() {
      LocationService.add()
        .then(function(location) {

        })
    }

    $scope.send = function() {
      $scope.close();
    }
///new_tweet modal 마지막





  });
