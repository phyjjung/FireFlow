angular.module('starter')

.service('getflowProfile',['$firebaseArray', '$firebaseObject','$q',
function($firebaseArray,$firebaseObject,$q){
  const rootRef = firebase.database().ref();
  const flowlistRef = rootRef.child("flow").child("flowlist");
  const followerslistRef = rootRef.child("flow").child("followers");

  this.getflow =function(flowId){
    let flowProfileRef = flowlistRef.child(flowId);
    var flowProfile = $firebaseObject(flowProfileRef);
    return flowProfile;
  };
  //팔로윙 여부를 블러옴
  this.getfollowerforId = function (flowId,userid) {
    var defer = $q.defer();

    followerslistRef.child(flowId).child(userid).once('value',function(snapshot){
      var IsUid = snapshot.val();
      defer.resolve(IsUid);
    });
    return defer.promise;
  };

  this.addFollowing = function (flowId,userid){
    var userFollowNumRef = rootRef.child("users").child(userid).child("Profile").child("FollowingFlow");
    userFollowNumRef.transaction(function(currentFollower){
      return currentFollower+1;
    });

    var flowFollowNumRef = flowlistRef.child(flowId).child("followers");
    flowFollowNumRef.transaction(function(flowfollowers){
      return flowfollowers+1;
    });

    var updates = {};
    updates['/flow/followers/'+flowId+'/'+userid] = "yesyes";
    updates['/users/'+userid+'/UserFlowList/'+flowId]="true";
    return rootRef.update(updates);
  };

  this.unFollowing = function (flowId,userid){
    var userFollowNumRef = rootRef.child("users").child(userid).child("Profile").child("FollowingFlow");
    userFollowNumRef.transaction(function(currentFollower){
      return currentFollower-1;
    });

    var flowFollowNumRef = flowlistRef.child(flowId).child("followers");
    flowFollowNumRef.transaction(function(flowfollowers){
      return flowfollowers-1;
    });

    console.log("UnfollowingSend누름");
    rootRef.child("users").child(userid).child("UserFlowList").child(flowId).remove();
    return followerslistRef.child(flowId).child(userid).remove();
  };
}])

.service('userflowlist',['$firebaseArray', '$firebaseObject',function($firebaseArray,$firebaseObject){

  const rootRef = firebase.database().ref();
  const flowlistRef = rootRef.child("flow").child("flowlist");

  // userlist에서 받은걸로 flowlist과 가지고옴.
  this.getflowlist= function (userid){
    const userflow = rootRef.child("users").child(userid);
    var flowlist = new Array();
    userflow.child('UserFlowList').on('child_added', snap =>{
      //snap안에 쓰잘데기 없는게 있으면서 그 사이에 key가 있음
      //그리고 그키를 이용해서 list를 받아옴
      let flowlistForUser = flowlistRef.child (snap.key);
      // 그 key 위치를 이용하여 받아옴.
      //유저의 flowlist를 가지고옴
      var FlowListtest = $firebaseObject(flowlistForUser);
      flowlist.push(FlowListtest);
      
    });

    userflow.child ('UserFlowList').on('child_removed', snap=>{
      flowlist.splice(flowlist.indexOf(snap.key),1);
    });

    return flowlist;
  };


  this.makeNewFlow= function (userid,flowName,description,subflowNumber,subflows){
    var flowData = {
      author: "",
      title: "",
      followers : 1,
      description : "",
      subflowNumber : 0,
      subflows : "",
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };

    flowData.author = userid;
    flowData.title = flowName;
    flowData.description = description;
    flowData.subflowNumber = subflowNumber;
    flowData.subflows = subflows;
    console.log("makeNewFlow  :"+flowName);
    const userflow = rootRef.child("users").child(userid).child('UserFlowList');
    //key를 만드는 동시에 받음.. 'true'가 내용이 되면서 들어감.
    var newPostKey =  userflow.push('true').key;
    var makeFlow = {};
    var followingData = {};

    makeFlow['/flow/flowlist/' + newPostKey] = flowData;
    followingData[userid]="yesyes";
    makeFlow['/flow/followers/'+newPostKey] = followingData;
    firebase.database().ref().update(makeFlow);

    var userFollowNumRef = rootRef.child("users").child(userid).child("Profile").child("FollowingFlow");
    userFollowNumRef.transaction(function(currentFollower){
      return currentFollower+1;
    });

  }

  return this;

}
])
