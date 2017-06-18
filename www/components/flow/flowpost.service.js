angular.module('starter')
//  만드는 중
  .service('FlowPostService', ["$firebaseArray",
    function ($firebaseArray) {
      const ref = firebase.database().ref();
      const flowForPostRef = ref.child("post").child("postlistforFlow");

      this.getAll = function (flowId) {
        console.log("getAll 시작");
        var AllPostForFlow = flowForPostRef.child(flowId);
        var query = AllPostForFlow.orderByChild("created_at").limitToLast(25);
        console.log($firebaseArray(query));
        return $firebaseArray(query)
        // type: {
        //   name: 'reply',
        //   referencer: 'Hieu Pham'
        // }
      };

      this.makeNewPost = function(userId, postTitle, content, flowId) {
        console.log("makeNewPost 시작");
        const rootRef = firebase.database().ref();
        const newPostKey = rootRef.child('post').child('postlist').push().key;

        console.log("new post key ="+newPostKey);
        console.log("author id="+userId);
        var postData = {
          author: "",
          title: "",
          text: "",
          flow: "",
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };

        postData.author = userId;
        postData.title = postTitle;
        postData.text = content;
        postData.flow = flowId;

        var makePost = {};
        makePost['/post/postlist/' + newPostKey] = postData;
        makePost['/post/postlistforFlow/' + flowId + '/' + newPostKey] = postData;
        makePost['/users/' + userId + '/userpostlist/' + newPostKey] = postData;

        rootRef.update(makePost);
        //에러처리 추가 해야됨
        console.log("makeNewPost 끝");
      };

      return this;
    }
  ]);
