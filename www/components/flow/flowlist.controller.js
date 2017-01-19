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

    $scope.newflow={};



    $scope.send = function() {
        if($scope.newflow.title == undefined || $scope.newflow.description == undefined){
            console.log("undefined");
        }
        else{
            var titlestringlength = $scope.newflow.title.replace(/^\s+|\s+$/gm,'').length;
            var descriptionstringlength = $scope.newflow.description.replace(/^\s+|\s+$/gm,'').length;
            console.log(descriptionstringlength);
            console.log(titlestringlength);

            if(!(titlestringlength ==0) && !(descriptionstringlength ==0)){
                console.log("infunciton : "+ $scope.newflow.description);
                userflowlist.makeNewFlow($authuid,$scope.newflow.title,$scope.newflow.description);
                $scope.newflow.title.$setPristine;
                $scope.newflow.description.$setPristine;
                $scope.close();
            };
        };
    };
    ///new_flow Modal modal 마지막
});
