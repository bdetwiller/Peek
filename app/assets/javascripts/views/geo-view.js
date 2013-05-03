App.Views.Geo = Backbone.View.extend({
  event: {
    //add in here
  },

  addListener: function() {
    var that = this
    var geoListen = google.maps.event.addListener(map, 'click', function(event){
      
      that.clickMarker(event.latLng);
      var position = {lat: event.latLng.lat(), lng: event.latLng.lng() };
      that.getPhotos(position);
    });
  },

  clickMarker: function(location) {

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });

    map.setCenter(location);
  },

  getPhotos: function(location) {
    var that = this;
    var distance = 1000
    $.ajax({
      url: 'https://api.instagram.com/v1/media/search?callback=?',
      data: {lat: location.lat, lng: location.lng, distance: distance, client_id: App.Settings.instaClientID},
      dataType: 'json',
      success: function(response) { 
        var geoPhotosCollection = new App.Collections.Photos(response.data);
        var geoPhotosView = new App.Views.Photos({
          id: "geo",
          collection: geoPhotosCollection
        });

        geoPhotosView.processPhotos();
        geoPhotosView.addtoMap();
      }
    });
  }

});