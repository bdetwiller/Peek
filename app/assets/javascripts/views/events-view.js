App.Views.Events = Backbone.View.extend({
	event: {
    //add in here
	},


	addListener: function() {
		var that = this
	  var geoListen = google.maps.event.addListener(map, 'click', function(event){
      that.clickMarker(event.latLng);
	    var position = {lat: event.latLng.lat(), lng: event.latLng.lng(), dist: '1500'};
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

		$.ajax({
		  url: 'https://api.instagram.com/v1/media/search?callback=?',
		  data: {lat: location.lat, lng: location.lng, distance:location.dist, client_id: App.Settings.clientID},
      dataType: 'json',
      success: function(response) { that.processPhotos(response); }
  	});
	},

  processPhotos: function(response){
    var that = this;

    that.$el.empty();
    App.Collections.eventPhotos = new App.Collections.Photos(response.data);
    App.Collections.eventPhotos.each(function(photo) {
      that.$el.append(JST["gallery/image"]( {photo: photo} ));
    });
    that.addtoGallery(that.$el);

  },

  addtoGallery: function(photos){
    var that = this;
    $('#gallery').empty();
    $('#gallery').html(photos);
    that.installFancyBox();
  },

  installFancyBox: function(){
    $("a.fancybox").fancybox({
    		transitionIn	:	'elastic',
        closeBtn : false,
        overlay : false,
        helpers     : {
               title: { type: 'inside' },
               overlay : null
             }
    });
  }



});