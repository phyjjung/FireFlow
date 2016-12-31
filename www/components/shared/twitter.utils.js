angular.module('starter.utils', [])

  .filter('post', function($filter) {
    var MAX_LENGTH = 140;

    return function(input) {
      output = input || '';

      if (output.length > MAX_LENGTH) {
        output = $filter('limitTo')(output, MAX_LENGTH) + '...';
      }

      output = $filter('linky')(output);

      output = output.replace(/\S*#(?:\[[^\]]+\]|\S+)/ig, '<a href>$&</a>');

      output = output.replace(/\B@[a-z0-9_-]+/gi, '<a href>$&</a>');

      return output;
    };
  })

  .directive('actionSheet', function() {
    return {
      restrict: 'AE',
      link: function(scope, el) {
        angular.element(el).on('click', function(){
          scope.show();
        })

        scope.$on('$destroy', function() {
          angular.element(el).off('click');
        })
      },
      bindToController: {
        actionSheet: '='
      },
      controllerAs: 'vm',
      controller: function($scope, $ionicActionSheet) {
        var vm = this;

        // Triggered on a button click, or some other target
        $scope.show = function() {

          // Show the action sheet
          var hideSheet = $ionicActionSheet.show({
            buttons: vm.actionSheet,
            // destructiveText: 'Delete',
            // titleText: 'Title of this action',
            cancelText: 'Cancel',
            buttonClicked: function(index) {
              return true;
            }
          });

        };
      }
    }
  })

  .directive('modal', function() {
    return {
      restrict: 'AE',
      link: function(scope, el) {
        angular.element(el).on('click', function() {
          scope.openModal();
        })

        scope.$on('$destroy', function() {
          angular.element(el).off('click');
        })
      },
      bindToController: {
        modal: '='
      },
      controllerAs: 'vm',
      controller: function($scope, $ionicModal) {
        var vm = this;

        $ionicModal.fromTemplateUrl(vm.modal, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;

          // To-do
          // if (vm.modal.indexOf('gif') !== -1) modal.show();
        });

        $scope.openModal = function() {
          $scope.modal.show();
        };
        $scope.closeModal = function() {
          $scope.modal.hide();
        };

      }
    }
  })

  .directive('randomAvatar', function() {
    var images = [
      'img/adam.jpg',
      'img/ben.png',
      'img/max.png',
      'img/mike.png',
      'img/perry.png',
      'https://pbs.twimg.com/profile_images/589457347229065217/ZtoGwJKr_bigger.jpg'
    ]

    return {
      restrict: 'AE',
      link: function(scope, el) {
        angular.element(el).attr('src', images[Math.round(Math.random(1)*(images.length - 1))]);
      }
    }
  })

  .directive('forceBack', function($ionicHistory) {
    return {
      restrict: "A",
      link: function(scope, el) {
        angular.element(el).on('click', function(){
          $ionicHistory.goBack();
        })
      },
    }
  })

  .filter('dateFormat', function($filter) {
    return function(input, format) {
      return $filter('date')(new Date(input), format);
    };
  })

  // .factory('$exceptionHandler', function() {
  //   return function errorCatcherHandler(exception, cause) {
  //     alert(exception.stack);
  //   };
  // });
