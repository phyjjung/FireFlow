angular.module('starter')

  .service('ChatService', function() {
    this.getAll = function() {
      return [
        // {
        //   isMe: true,
        //   type: 'image',// text || image
        //   body: 'http://media2.giphy.com/media/l0MYJzvLGHO9HlDuU/200.gif',
        //   timestamp: 'Feb 26, 2016, 9:47PM'
        // },
        // {
        //   isMe: false,
        //   avatar: 'img/adam.jpg',
        //   type: 'image',// text || image
        //   body: 'http://media2.giphy.com/media/l0MYJzvLGHO9HlDuU/200.gif',
        //   timestamp: 'Feb 26, 2016, 9:47PM'
        // },
        {
          isMe: true,
          type: 'text',// text || image
          body: 'Where are you, buddy?',
          timestamp: 'Feb 26, 2016, 9:47PM'
        },
        {
          isMe: false,
          avatar: 'img/adam.jpg',
          type: 'text',// text || image
          body: 'Hello, today was a good day!',
          timestamp: 'Feb 26, 2016, 9:47PM'
        }
      ];
    }
  });
  