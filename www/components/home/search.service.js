angular.module('starter')

  .service('SearchService', function($q) {
    this.query = function() {
      var data = [
        {
          title: '#KimExposedTaylorParty',
          count: 1200
        }
      ];

      angular.forEach([0,1,2,3,4], function() {
        data = data.concat(data);
      })

      return $q.resolve(data);
    }

    return this;
  });
  