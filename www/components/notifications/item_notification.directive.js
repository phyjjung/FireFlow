angular.module('starter')
  .directive('itemNotification', function() {
    return {
      restrict: 'E',
      replace: true,
      bindToController: {
        data: '='
      },
      // To-do: these are ES6 syntax, should have been the proper '' +
      templateUrl: 'components/notifications/views/item_notification.directive.html',
      controllerAs: 'vm',
      controller: function() {
        var vm = this;


      }
    }
  })
