angular.module('starter')

  .service('PeopleService', function(PostService) {
    this.getAll = function() {
      return PostService.getAll()
    }

    return this;
  });
  