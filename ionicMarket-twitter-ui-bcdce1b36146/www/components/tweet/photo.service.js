angular.module('starter')
  .service('PhotoService', function($cordovaCamera, $q) {
    document.addEventListener("deviceready", function () {
      options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.PICTURE,
        // allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 640,
        targetHeight: 1280,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation:true
      };
    });

    this.add = function() {
      if (typeof Camera === 'undefined') return $q.reject();
      console.log('hey');

      return $cordovaCamera.getPicture(options);
    }
  })