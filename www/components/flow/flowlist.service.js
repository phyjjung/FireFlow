angular.module('starter')

.service('userflowlist',['$firebaseArray', '$firebaseObject',function($firebaseArray,$firebaseObject){

    // userlist에서 받은걸로 flow셜과 가지고옴.
    this.getflowlist= function (userid){
      const rootRef = firebase.database().ref();
      const flowlistRef = rootRef.child("flow").child("flowlist");
     const userflow = rootRef.child("users").child(userid);

        var flowlist = new Array();
        userflow.child('UserFlowList').on('child_added', snap =>{
            //snap안에 쓰잘데기 없는게 있으면서 그 사이에 key가 있음
            let flowlistForUser = flowlistRef.child (snap.key);
            // 그 key 위치를 이용하여 받아옴.
            //유저의 flowlist를 가지고옴
            var FlowListtest = $firebaseObject(flowlistForUser);
            flowlist.push(FlowListtest);
        });

        return flowlist;
    };


return this;

  }
])

//  .factory('flowlist', ['$firebaseArray','$firebaseObject',

//  function($firebaseArray, $firebaseObject,Auth){
//    var flowlistRef = firebase.database().ref().child("flow").child("flowlist").orderByChild("followers");
//    console.log("FlowList factory");

//    var FlowList = $firebaseArray(flowlistRef);

//    return FlowList;
//  }])
