App.Views.Geo = Backbone.View.extend({
  event: {
    //add in here
  },


  addListener: function() {
    var that = this
    var geoListen = google.maps.event.addListener(map, 'click', function(event){
      that.clickMarker(event.latLng);
      that.getPhotos(event.latLng);
    });

    var tooltip = $("#help")

    tooltip.slideDown(function() {
      setTimeout(function() {
        tooltip.slideUp();
      }, 4000);
    });
  },

  loadInfo: function() {
    $('#sidebar').empty();
    $('#sidebar').html(JST["gallery/initial"]());
  },

  clickMarker: function(location) {
    if(window.markersArray) {
      for (i in window.markersArray) {
        window.markersArray[i].setMap(null); 
      }
    }
    
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });

    window.markersArray.push(marker);
    map.setCenter(location);
  },

  getPhotos: function(location) {
    var that = this;
    var distance = 1500
    var time = new Date();
    var min_time = Math.round((new Date(time - 24 * 3600000)).getTime()/1000);

    $.ajax({
      url: 'https://api.instagram.com/v1/media/search?callback=?',
      data: {lat: location.lat(), lng: location.lng(), min_timestamp: min_time, distance: distance, client_id: App.Settings.instaClientID},
      dataType: 'json',
      success: function(response) { 
        that.handleResponse(response);
      }
    });
  },

  handleResponse: function(response) {
    var geoPhotosCollection = new App.Collections.Photos(response.data);
      App.Store.geoPhotosView = new App.Views.Photos({
        id: "geo",
        collection: geoPhotosCollection
      });
    App.Store.geoPhotosView.processPhotos();
    App.Store.geoPhotosView.addtoMap();
  },

  addSearch: function() {
    var view = this
    var input = (document.getElementById('placesearch'));
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var that = view
      var place = autocomplete.getPlace();  
      var location = place.geometry.location  
      router.navigate("geo/" + location, {trigger: true})
    });
  },

  handleQuery: function(place) {
    var that = this   
    var place = place.replace(/[(]/g,"").replace(/[)]/g,"");
    var location = place.split(", ");
    console.log("ran query");
    var locationObject = new google.maps.LatLng(location[0], location[1]);
    
    that.getPhotos(locationObject);
    that.clickMarker(locationObject);
    map.setCenter(locationObject);
    map.setZoom(14);
  }

});