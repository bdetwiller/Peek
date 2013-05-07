App.Views.Friends = Backbone.View.extend({

  initialize: function(){
    var that = this;

    if(window.markersArray) {
      for (i in window.markersArray) {
        window.markersArray[i].setMap(null); 
      }
    }

    that.getFeed();
  },

  getFeed: function(user_auth) {
      var that = this;

    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/feed?callback=?',
      data: {access_token: App.Settings.auth, count: 30},
        dataType: 'json',
        success: function(response) { 
          var photos = new App.Collections.Photos(response.data);
          var photosWithLocation = photos.hasLocation();
          var friendPhotosView = new App.Views.Photos({
            collection: photosWithLocation
          })

          friendPhotosView.processPhotos();
          friendPhotosView.addtoMap();
        }
      });
  },


})




