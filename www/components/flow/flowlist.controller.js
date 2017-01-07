angular.module('starter')

  .controller('FlowCtrl', function($scope,userflowlist,Auth) {
  $authuid = Auth.$getAuth().uid;
  $scope.flowlist=userflowlist.getflowlist($authuid) ;
  //flowlist를 애귤라에 연결
  $scope.results = $scope.flowlist;

  });
