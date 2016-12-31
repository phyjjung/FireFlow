angular.module('ionic.giphy', ['monospaced.elastic', 'hj.gridify'])
  /*
    Giphy Service v0.5
    API Docs: https://github.com/Giphy/GiphyAPI#search-endpoint
  */
  .service('Giphy', function($http, $rootScope, $ionicModal, $q) {
    var API_KEY = 'dc6zaTOxFJmzC'; // Public Beta Key
    var ENDPOINT = 'http://api.giphy.com/v1/gifs/';
    var self = this;

    this.search = function(query) {
      return $http.get(ENDPOINT + 'search', {params: {
        q: query,
        limit: 25,
        api_key: API_KEY
      }}).then(function(response) {
        return response.data.data;
      })
    }

    this.trending = function() {
      return $http.get(ENDPOINT + 'trending', {params: {
        api_key: API_KEY,
        limit: 25
      }}).then(function(response) {
        return response.data.data;
      })
    }

    this.openModal = function($scope) {
      var deferred = $q.defer();
      
      $scope = $scope || $rootScope.$new();

      $ionicModal.fromTemplateUrl('components/tweet/views/giphy.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        modal.show();
        _getTrending();
      });
      
      $scope.close = function() {
        $scope.modal.hide();
      };

      _addRatio = function(photos) {
        angular.forEach(photos, function(item) {
          item.ratio = item.images.fixed_height_small.width / item.images.fixed_height_small.height;
        });
        return photos;
      }

      _getTrending = function() {
        self.trending()
          .then(function(photos) {
            $scope.gifs = _addRatio(photos);
          })
      }

      $scope.state = {
        gifsearch: ''
      }

      $scope.change = function() {
        var newValue = $scope.state.gifsearch;
        
        if (newValue.length) {
          $scope.isGifLoading = true;
          $scope.gifs = [];

          self.search(newValue)
            .then(function(photos) {
              $scope.gifs = _addRatio(photos);

              $scope.isGifLoading = false;
            })
        } else {
          _getTrending();
        }
      };

      $scope.select = function(imageUrl) {
        deferred.resolve(imageUrl);
        $scope.close();
      }

      return deferred.promise;
    }
  })

  .directive('elastic', function() {
    return {
      restric: 'A',
      link: function(scope, el, attr) {
        scope.$on('elastic:resize', function(event, element, oldHeight, newHeight) {
          newHeight = Math.max(44, newHeight);
          el[0].style.height = newHeight + 'px';
        });
      }
    }
  })

  .filter('nl2br', ['$filter',
    function($filter) {
      return function(data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
      };
    }
  ])
