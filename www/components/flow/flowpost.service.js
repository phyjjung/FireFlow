angular.module('starter')

  .service('FlowPostService', ["$firebaseArray",
  function($firebaseArray) {
    const ref = firebase.database().ref();
    const flowForPostRef = ref.child("post").child("postlistforFlow");

    this.getAll = function(flowId){

         var AllPostForFlow = flowForPostRef.child("-KeXBvhexESwhaws4ton");
       var query = AllPostForFlow.orderByChild("created_at").limitToLast(25);
       console.log($firebaseArray(query));
       return $firebaseArray(query)
        // type: {
        //   name: 'reply',
        //   referencer: 'Hieu Pham'
        // }
      };

      /* Tweet isReference */
      // 0: normal
      // 1: true

      /* Tweet TYPE */
      // 0: normal
      // 1: photo
      // 2: link
      // 3: repos
      // 4: article


  }]);
