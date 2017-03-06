angular.module('starter')
  .directive('itemTweet', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      // To-do: these are ES6 syntax, should have been the proper '' +
      //attrs.type이란 directive내에서 type으로 정의된 내용을 의미함. 즉 type="big"이면 아래 type에 big을 넣으면 됨.
      templateUrl: function(elem, attrs) {
        var type = attrs.type || 'feed';

        return 'components/shared/views/item_tweet_' + type + '.directive.html';
      },
      controller: function($scope) {
      }
    }
  })
