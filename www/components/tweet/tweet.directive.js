angular.module('starter')
  .directive('newTweet', function() {
    return {
      restrict: 'AE',
      template: '<button class="button button-clear button-positive button-icon ion-compose"></button>',
      replace: false,
      link: function(scope, el) {
        angular.element(el).on('click', function() {
          scope.open();
        })
      },
      controllerAs: 'vm',
      controller: function($scope, $ionicModal, Giphy, PhotoService, LocationService) {
        var vm = this;
        $scope.tweet = {
          text: '',
          imgSrc: null
        }

        $scope.removePhoto = function() {
          $scope.tweet.imgSrc = null;
        }

        $ionicModal.fromTemplateUrl('components/tweet/views/new_tweet.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.open = function() {
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
      }
    }
  })
