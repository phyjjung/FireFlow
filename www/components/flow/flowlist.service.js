angular.module('starter')

  .service('FlowListService', function($q) {
    this.query = function() {
      var data = [
        {
          Clantitle: '#KimExposedTaylorParty',
          ClanFollowerCount: 1200
        }
      ];

      angular.forEach([0,1,2,3,4], function() {
        data = data.concat(data);
      })

      return $q.resolve(data);
    }

    return this;
  });
