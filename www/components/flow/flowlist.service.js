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

.service('userflowlist',['$firebaseArray', '$firebaseObject',

  function($firebaseArray,$firebaseObject,Auth){

    const rootRef = firebase.database().ref();
    const userkey ='NyRMDzW79ncYvIgu5qvyBbzKmv93';
    const flowlistRef = rootRef.child("flow").child("flowlist");

    console.log('userflowlist');
    //유저의 flowlist를 가지고옴
   const userflow = rootRef.child("users").child(userkey);


    // userlist에서 받은걸로 flow셜과 가지고옴.
    function getFlowListProfileForUser (userkey){

        var flowlist = new Array();
        userflow.child('UserFlowList').on('child_added', snap =>{
          //snap안에 쓰잘데기 없는게 있으면서 그 사이에 key가 있음
          let flowlistForUser = flowlistRef.child (snap.key);
          //그 key 위치를 이용하여 받아옴.
          var FlowListtest = $firebaseObject(flowlistForUser);
          flowlist.push(FlowListtest);
          //보통은 아래와 같이 once로 받아옴. 하지만 여기서는 firebaseObject로 받아서 array push
          // flowlistForUser.once('value').then((snap) => {
          //  flowlist.push(snap.val());
          //  console.log (snap.val());
        //  });
          // flowlistForUser.once('value',cb);
        });

        return flowlist;
    };

    var userlistfinal = getFlowListProfileForUser (userkey);


return userlistfinal

  }
])
