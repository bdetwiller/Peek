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
  },

  addSearch: function() {
    var that = this
    var input = (document.getElementById('placesearch'));
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), dist: '1500'};
      console.log(location);
      that.getPhotos(location);
      that.clickMarker(place.geometry.location);
      map.setCenter(place.geometry.location);
      map.setZoom(12);
      // if (!place.geometry) {
      //   // Inform the user that the place was not found and return.
      //   input.className = 'notfound';
      //   return;
    })
  }

});