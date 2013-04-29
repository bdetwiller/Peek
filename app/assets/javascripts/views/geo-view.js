App.Views.Geo = Backbone.View.extend({
	event: {
	 "click": "recent_user"	

	},

	render: function() {

	},



	addClickListener: function() {
		var that = this
	  google.maps.event.addListener(that.map, 'click', function(event){
	    var currentPos = {lat: event.latLng.lat(), lng: event.latLng.lng(), dist: '1000'};
	    console.log("I listened");

	    //placeClickMarker(event.latLng);
	    that.getNewPhotos(currentPos);
	  });
	},

	getNewPhotos: function(place) {
		$.ajax({
		  url: 'https://api.instagram.com/v1/media/search?callback=?',
		  dataType: 'json',
		  data: {'order': '-createdAt', lat: place.lat, lng: place.lng, distance:place.dist, client_id: App.Settings.clientID},
		  success: jsonLoad,
		  statusCode: {
		    500: function () {
		      alert('Sorry, service is temporarily down.');
		    }
		  }
  	});
	}

});