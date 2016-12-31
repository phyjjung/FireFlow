angular.module('starter')

  .controller('ChatDetailCtrl', function($scope, $stateParams, ChatService, Giphy, $ionicScrollDelegate, $timeout) {
    $scope.gifs = [];
    $scope.gifQuery = '';
    $scope.isGifShown = false;
    $scope.isGifLoading = false;
    $scope.messages = ChatService.getAll();

    $scope.message = '';
    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');

    $scope.sendText = function() {
      $scope.messages.push({
        isMe: true,
        type: 'text',
        body: $scope.message,
        timestamp: 'Feb 26, 2016, 9:47PM'
      });
      $scope.message = '';
      _scrollBottom();
      $scope.fakeReply();
    }

    $scope.sendGif = function(imageUrl) {
      console.log(imageUrl);
      $scope.messages.push({
        isMe: true,
        type: 'image',
        body: imageUrl,
        timestamp: 'Feb 26, 2016, 9:47PM'
      });
      $scope.message = '';
      _scrollBottom('#type-area2');
      $scope.fakeReply();
    }

    $scope.fakeReply = function() {
      $timeout(function() {
        $scope.messages.push({
          isMe: false,
          avatar: 'img/adam.jpg',
          type: 'text',
          body: 'Keep typing dude',
          timestamp: 'Feb 26, 2016, 9:47PM'
        });
        $scope.message = '';
        _scrollBottom();
      }, 2000)
    }

    $scope.openGiphy = function() {
      Giphy.openModal()
      .then(function(imageUrl) {
        $scope.sendGif(imageUrl);
      })
    }

    var _scrollBottom = function(target) {
      target = target || '#type-area';

      viewScroll.scrollBottom(true);
      _keepKeyboardOpen(target);
    }

    // Warning: Demo purpose only. Stay away from DOM manipulating like this
    var _keepKeyboardOpen = function(target) {
      target = target || '#type-area';

      txtInput = angular.element(document.body.querySelector(target));
      console.log('keepKeyboardOpen ' + target);
      txtInput.one('blur', function() {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }
  })
  