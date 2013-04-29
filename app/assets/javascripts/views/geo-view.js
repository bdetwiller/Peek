App.Views.Geo = Backbone.View.extend({
	event: {
	 "click": "recent_user"

	},

	render: function() {

	},


	addListener: function() {
		var that = this
	  google.maps.event.addListener(map, 'click', function(event){
      that.clickMarker(event.latLng);
	    var position = {lat: event.latLng.lat(), lng: event.latLng.lng(), dist: '1000'};
	    //placeClickMarker(event.latLng);
	    that.getPhotos(position);
	  });
	},

  clickMarker: function(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    map.setCenter(location);
  },

	getPhotos: function(location) {
    var that = this;

		$.ajax({
		  url: 'https://api.instagram.com/v1/media/search?callback=?',
		  data: {'order': '-createdAt', lat: location.lat, lng: location.lng, distance:location.dist, client_id: App.Settings.clientID},
      dataType: 'json',
      success: function(data) { that.renderGallery(data); }
  	});
	},

  createModels: function(data){
    data["data"].each
  }

});