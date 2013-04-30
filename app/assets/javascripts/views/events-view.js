App.Views.Events = Backbone.View.extend({
	event: {
	 "click": "recent_user"

	},

	render: function() {

	},


	addListener: function() {
		var that = this
	  google.maps.event.addListener(map, 'click', function(event){
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
		  data: {'order': '-createdAt', lat: location.lat, lng: location.lng, distance:location.dist, client_id: App.Settings.clientID},
      dataType: 'json',
      success: function(response) { that.processPhotos(response); }
  	});
    console.log(location.lat);
    console.log(location.lng);
	},

  processPhotos: function(response){
    var that = this;

    that.$el.empty();
    App.Collections.eventPhotos = new App.Collections.Photos(response.data);
    App.Collections.eventPhotos.each(function(photo) {
      that.$el.append(JST["gallery/image"]( {photo: photo} ));
      if(photo.attributes.caption) {
        console.log(photo.attributes.caption.text)};

    });
    console.log(that.$el);
    that.addtoGallery(that.$el);

  },

  addtoGallery: function(photos){
    var that = this;
    $('#gallery').empty();
    console.log("got here");
    $('#gallery').html(photos);

    $("a.fancybox").fancybox({
    		'transitionIn'	:	'elastic',
    		'transitionOut'	:	'elastic',
    		'speedIn'		:	600,
    		'speedOut'		:	200,
    		'overlayShow'	:	false,
        'titleShow' : true,
        helpers     : {
               title: {
                   type: 'over'
               }
             }
    	});
  }

});