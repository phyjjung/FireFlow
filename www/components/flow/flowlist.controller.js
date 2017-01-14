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


$scope.newFlowName ="sdf";
console.log("outfunciton : " + $scope.newFlowName);

  $scope.send = function() {
    var flowname = $scope.newFlowName;
    console.log("infunciton : "+ flowname);
    userflowlist.makeNewFlow($authuid,flowname);
    $scope.close();
  }
  ///new_flow Modal modal 마지막
});
