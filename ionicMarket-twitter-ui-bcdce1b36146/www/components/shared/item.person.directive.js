angular.module('starter')
  .directive('itemPerson', function() {
    return {
      restrict: 'E',
      bindToController: {
        data: '='
      },
      // To-do: these are ES6 syntax, should have been the proper '' +
      templateUrl: 'components/shared/views/item_person.directive.html',
      controllerAs: 'vm',
      controller: function() {
        var vm = this;


      }
    }
  })
