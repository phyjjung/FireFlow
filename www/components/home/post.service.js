angular.module('starter')

  .service('PostService', function($q) {
    this.getAll = function() {
      var item = {
        created_at: 'Sun Aug 23 00:30:33 +0700 2016',
        text: 'Has #Pokemon Go taken over the @world? Not #really. http://pokemongo.com',
        entities: {
          urls: [
            {
              url: 'http://holykaw.alltop.com/whats-going-happen-humans-future?gk1'
            }    
          ],
          media: [
            {
              url: 'https://o.twimg.com/2/proxy.jpg?t=HBhUaHR0cHM6Ly9jbXMtYXNzZXRzLnR1dHNwbHVzLmNvbS91cGxvYWRzL3VzZXJzLzMwL3Bvc3RzLzI2OTc3L3ByZXZpZXdfaW1hZ2UvcHJlLTEucG5nFKAGFKIDHBSEBhSUAwAAFgASAA&s=9dt_Z05iSoJmuasv8rz097REGcvjrZxVIgAd10SYmWQ'
            }
          ]
        },
        user: {
          name: 'Hieu Pham',
          screen_name: 'mrhieu',
          profile_image_url: 'https://pbs.twimg.com/profile_images/589457347229065217/ZtoGwJKr_bigger.jpg'
        },
        // type: {
        //   name: 'reply',
        //   referencer: 'Hieu Pham'
        // }
      };

      /* Tweet isReference */
      // 0: normal
      // 1: true

      /* Tweet TYPE */
      // 0: normal
      // 1: photo
      // 2: link
      // 3: repos
      // 4: article

      var data = [];
      for (var i = 0; i < 24; i++) {
        data.push(angular.extend({
          type: getRandomValue(4),
          isReference: getRandomValue(1)
        }, item));
      }


      return $q.resolve(data);
    }

    function getRandomValue(n) {
      return Math.round(Math.random() * n);
    }

    return this;
  });
  