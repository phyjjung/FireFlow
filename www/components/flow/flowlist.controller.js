angular.module('starter')

.controller('FlowListCtrl', function($scope,$ionicModal,userflowlist,Auth) {
  $scope.showthis = true;
  $authuid = Auth.$getAuth().uid;
  $scope.authuid = $authuid;
  //flowlist를 userlist에서 받아옴
  $scope.flowlist=userflowlist.getflowlist($authuid) ;
  //flowlist를 애귤라에 연결
  console.log($scope.flowlist);
  $scope.results = $scope.flowlist;
  $scope.data = {};
  $scope.data.selectedFlows ={};
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
    <!--flow드롭다운을 닫아준다. 드롭다운의 아이디를 받아서 leave로 만든다. 크롬에서 아이디 확인함.-->
    var superpositionflowdrop = document.getElementById( 'select_container_4' );
    superpositionflowdrop.classList.remove( 'md-active' );
    superpositionflowdrop.classList.add( 'md-leave' );

    $scope.newflow.title = "";
    $scope.newflow.description = "";
    $scope.showthis = true;
    $scope.newflow.formset.$setPristine();
    $scope.newflow.formset.$setUntouched();
    console.log($scope.data.selectedFlows);
    $scope.data.selectedFlows =[];
    document.getElementById("makeFlowForm").reset();
    $scope.modal.hide();
  };

  $scope.newflow={};

  $scope.composeflow = function(){
    var superpositionflowdrop = document.getElementById( 'select_container_4' );
    superpositionflowdrop.classList.remove( 'md-active' );
    superpositionflowdrop.classList.remove( 'md-clickable' );
    superpositionflowdrop.style.display="none";
    superpositionflowdrop.setAttribute("aria-hidden", true);
    superpositionflowdrop.classList.add( 'md-leave' );
    console.log($scope.data.selectedFlows);

    console.log($scope.data.selectedFlows.length);
    var jasonend = JSON.stringify($scope.data.selectedFlows);
    console.log(jasonend);

  }

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
        userflowlist.makeNewFlow($authuid,$scope.newflow.title,$scope.newflow.description,$scope.data.selectedFlows.length,$scope.data.selectedFlows);
        $scope.newflow.title="";
        $scope.newflow.description="";
        $scope.showthis = true;
        $scope.newflow.formset.$setPristine();
        $scope.newflow.formset.$setUntouched();
        document.getElementById("makeFlowForm").reset();
        console.log($scope.data.selectedFlows);
        $scope.data.selectedFlows =[];
        $scope.close();
      };
    };
  };
  ///new_flow Modal modal 마지막
})

.controller('FlowCtrl', function($scope, $stateParams, $ionicModal, getflowProfile, PostService, Giphy, PhotoService, LocationService) {
  //flowlisr로부터 넘어온 데이타. html에서 넘어온다.
  $scope.flowtitle = $stateParams.flowName;
  $scope.flowId = $stateParams.flowId;
  $scope.authid = $stateParams.authuid;

  console.log("flowid : "+$scope.flowId);
  console.log("authuid : "+$scope.authid);
  $scope.flowProfile = getflowProfile.getflow($scope.flowId);

  //현재 팔로우하는지 여부를 읽는곳
  getflowProfile.getfollowerforId($scope.flowId,$scope.authid).then(function(data){ $scope.IsFollwers = data;});
  //console.log("Is Followers? : "+getflowProfile.getfollowerforId($scope.flowId,$scope.authid));
  console.log("디스클!"+$scope.IsFollwers);
  //팔로윙여부를 변경하는곳

  $scope.followingSend = function(){
    console.log("followingSend누름");
    //$scope.IsFollwers = "yesyes";
    getflowProfile.addFollowing($scope.flowId,$scope.authid).then(function(response){
      return getflowProfile.getfollowerforId($scope.flowId,$scope.authid).then(function(data){
        $scope.IsFollwers = data;});
      });
    };

    $scope.UnfollowingSend = function(){
      getflowProfile.unFollowing($scope.flowId,$scope.authid).then(function(response){
        return getflowProfile.getfollowerforId($scope.flowId,$scope.authid).then(function(data){
          $scope.IsFollwers = data;});
      });
    };

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
