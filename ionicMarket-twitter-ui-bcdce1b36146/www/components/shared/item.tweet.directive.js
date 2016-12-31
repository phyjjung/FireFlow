angular.module('starter')
  .directive('itemTweet', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      // To-do: these are ES6 syntax, should have been the proper '' +
      templateUrl: function(elem, attrs) {
        var type = attrs.type || 'feed';
        
        return 'components/shared/views/item_tweet_' + type + '.directive.html';
      },
      controller: function($scope) {
      }
    }
  })
