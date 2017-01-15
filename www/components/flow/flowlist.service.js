angular.module('starter')

.service('userflowlist',['$firebaseArray', '$firebaseObject',function($firebaseArray,$firebaseObject){

  const rootRef = firebase.database().ref();
  const flowlistRef = rootRef.child("flow").child("flowlist");
  // userlist에서 받은걸로 flow셜과 가지고옴.
  this.getflowlist= function (userid){

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


this.makeNewFlow= function (userid,flowName,description){
  var flowData = {
      author: "",
      title: "",
      followers : 1,
      description : ""
    };

 flowData.author = userid;
 flowData.title = flowName;
 flowData.description = description;

 console.log("makeNewFlow  :"+flowName);
 const userflow = rootRef.child("users").child(userid).child('UserFlowList');
 //key를 만드는 동시에 받음.. 'true'가 내용이 되면서 들어감.
 var newPostKey =  userflow.push('true').key;
 var makeFlow = {};


 makeFlow['/flow/flowlist/' + newPostKey] = flowData;

 firebase.database().ref().update(makeFlow);

}


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
