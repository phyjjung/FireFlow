angular.module('starter.timeAgo', [])
  .run(function() {
    moment.updateLocale('en', {
      relativeTime : {
          future: "in %s",
          past:   "%s",
          s:  "seconds",
          m:  "1m",
          mm: "%dm",
          h:  "1h",
          hh: "%dh",
          d:  "1d",
          dd: "%dd",
          M:  "1m",
          MM: "%dm",
          y:  "1y",
          yy: "%dy"
      }
    });
  })

  .directive('timeAgo', function() {
    return {
      restrict: 'AE',
      scope: {
        value: '='
      },
      template: '<span>{{timeAgo}}</span>',
      controller: function($scope) {
        $scope.timeAgo = moment(new Date($scope.value)).fromNow();
      }
    }
  });
