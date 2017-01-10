angular.module('starter')

  .controller('FlowCtrl', function($scope,$ionicModal,userflowlist,Auth) {
  $authuid = Auth.$getAuth().uid;
  $scope.flowlist=userflowlist.getflowlist($authuid) ;
  //flowlist를 애귤라에 연결
  $scope.results = $scope.flowlist;

  ///new_flow modal 시작
      $ionicModal.fromTemplateUrl('components/flow/views/new_flow.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.open_new_flow = function() {
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
  ///new_flow Modal modal 마지막
  });
