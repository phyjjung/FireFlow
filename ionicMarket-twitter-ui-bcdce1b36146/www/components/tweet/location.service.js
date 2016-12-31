 angular.module('starter')
  .service('LocationService', function($rootScope, $ionicModal, $q) {
    this.add = function($scope) {
      var deferred = $q.defer();
      
      $scope = $scope || $rootScope.$new();

      $ionicModal.fromTemplateUrl('components/tweet/views/location.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        modal.show();
      });
      
      $scope.close = function() {
        $scope.modal.hide();
        deferred.resolve(true);
      };

      return deferred.promise;
    }

    return this;
  })
