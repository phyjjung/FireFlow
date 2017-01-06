angular.module('starter')

  .service('FlowListService', function($q) {
    this.query = function() {
      var data = [
        {
          Clantitle: '#KimExposedTaylorParty',
          ClanFollowerCount: 1200
        }
      ];

      angular.forEach([0,1,2,3,4], function() {
        data = data.concat(data);
      })

      return $q.resolve(data);
    }

    return this;
  })

  .factory('flowlist', ['$firebaseArray','$firebaseObject',
  function($firebaseArray, $firebaseObject,Auth){
    var flowlistRef = firebase.database().ref().child("flow").child("flowlist").orderByChild("followers");
    console.log("FlowList factory");

    var FlowList = $firebaseArray(flowlistRef);

    return FlowList;
  }])

.factory('userflowlist',['$firebaseArray', '$firebaseObject',
  function($firebaseArray,Auth){
    const rootRef = firebase.database().ref();
    const userkey ='NyRMDzW79ncYvIgu5qvyBbzKmv93';
    const flowlistRef = rootRef.child("flow").child("flowlist");
    var FlowList = $firebaseArray(flowlistRef);
    console.log('userflowlist');
    //유저의 flowlist를 가지고옴
   const userflow = rootRef.child("users").child(userkey);
    //userflow.child('UserFlowList').once ('value',snap =>{console.log(snap.val());console.log (snap.key)});

    // userlist에서 받은걸로 flow셜과 가지고옴.
    function getFlowListProfileForUser (userkey,cb){
        userflow.child('UserFlowList').on('child_added', snap =>{
          let flowlistForUser = flowlistRef.child (snap.key);

          flowlistForUser.once('value',cb);
        });
    }

    getFlowListProfileForUser (userkey,snap => console.log (snap.val()));

return FlowList;

  }
])
