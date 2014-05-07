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
    var distance = 1500;
    var lat = location.lat();
    var lng = location.lng();
    var time = new Date();
    var min_time = Math.round((new Date(time - 24 * 3600000)).getTime()/1000);
    var run_flag = 0; 

    that.instagramRequest(distance, lat, lng, min_time, run_flag);
  },

  instagramRequest: function(distance, lat, lng, min_time, run_flag) {
    var that = this
      $.ajax({
      url: 'https://api.instagram.com/v1/media/search?callback=?',
      data: {lat: lat, lng: lng, min_timestamp: min_time, distance: distance, client_id: App.Settings.instaClientID},
      dataType: 'json',
      success: function(response) { 
        if(response.meta.code === 200 && response.data.length === 0) {
          that.noPhotos();
        } else if (response.meta.code === 400 && run_flag < 3) { //if fails make request again
          run_flag ++;
          that.instagramRequest(distance, lat, lng, min_time, run_flag);
        } else if (response.meta.code === 200) {
          that.handleResponse(response);
        }
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
      console.log(place);
      var location = place.geometry.location  
      router.navigate("geo/" + location, {trigger: true})
    });
  },

  handleQuery: function(place) {
    var that = this   
    var place = place.replace(/[(]/g,"").replace(/[)]/g,"");
    var location = place.split(", ");
    var locationObject = new google.maps.LatLng(location[0], location[1]);
    
    that.getPhotos(locationObject);
    that.clickMarker(locationObject);
    map.setCenter(locationObject);
    map.setZoom(14);
  },

  noPhotos: function() {
    $('#sidebar').empty();
    $('#sidebar').html(JST["gallery/nophotos"]());
  },
});