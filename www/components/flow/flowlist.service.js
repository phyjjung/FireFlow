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
    var flowlistRef = firebase.database().ref().child("users").child("FlowList").orderByChild("followers");
    console.log("FlowList factory");

    var FlowList = $firebaseArray(flowlistRef);

    return FlowList;
  }])
