angular.module('starter')

  .service('NotificationsService', function(PostService) {
    this.getAll = function() {
      return PostService.getAll();
    }

    return this;
  });
  