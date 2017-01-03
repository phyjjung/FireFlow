angular.module('starter')
  .service('AuthService', function() {
    return this
  })

  .factory('Auth',
    function($firebaseAuth) {
      console.log("Auth factory");
      var auth =  $firebaseAuth();
      return auth;
    })
