// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'firebase',
  'starter.timeAgo',
  'starter.utils',
  'ion-sticky',
  'monospaced.elastic',
  'ngCordova',
  'ionic.giphy'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.navBar
    .alignTitle('center')
    .positionPrimaryButtons('left')
    .positionSecondaryButtons('right');
  $ionicConfigProvider.tabs
    .position('bottom')
    .style('standard');
})


.factory('flowlist', ['$firebaseArray','$firebaseObject',
function($firebaseArray, $firebaseObject,Auth){
  var flowlistRef = firebase.database().ref().child("users").child("FlowList").orderByChild("followers");
  console.log("FlowList factory");

  var FlowList = $firebaseArray(flowlistRef);

  return FlowList;
}])


  .factory('Users', ['$firebaseArray','$firebaseObject',
  function($firebaseArray, $firebaseObject,Auth){
    var usersRef = firebase.database().ref().child("users");
    console.log("users factory");

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid).child('Profile')); },
      };

    return Users;
  }]);
