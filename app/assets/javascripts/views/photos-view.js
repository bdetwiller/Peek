App.Views.Photos = Backbone.View.extend({

	processPhotos: function(){
    var that = this;
    that.collection.each(function(photo) {
      that.$el.append(JST["gallery/image"]( {photo: photo} ));

      // $('#' + photo.get("id")).mouseenter(function () { //need to fix
      // });
    });

    if(that.options.forEvent) {
    	that.$el.css("display", "none");
			that.addPhotoDivs(that.$el);
    } else {
    	that.addtoSidebar(that.$el);
    }
  },

  addtoMap: function(){ 
 		var that = this;   
    that.collection.each(function(photo) {
      var LatLng = new google.maps.LatLng(photo.get("location").latitude, photo.get("location").longitude);
      var thumbnail = photo.get("images").thumbnail.url;
      var low_res = photo.get("images").low_resolution.url;
      var time = photo.get("created_time");
      var username = photo.get("user").username

      if (photo.get("caption")) { 
    			var caption = photo.get("caption").text;
    	} else {
    		var caption = null;
    	}

     
      var infowindow = that.createInfoWindow(caption, username, low_res, time);
      that.createMarker(LatLng, thumbnail, infowindow);
    });
  },

  createMarker: function(LatLng, thumbnail, infowindow){
  	var that = this;
    var marker = new RichMarker({
			position: LatLng,
			map: map,
			draggable: false,
			flat: true,
			content: '<div class="mymarker"><img src="' + thumbnail +
  			'" style="border:2px solid white; height:40px; width:40px; box-shadow:2px 2px 10px black;"/></div>'
    });

		window.markersArray.push(marker);

  	google.maps.event.addListener(marker, 'click', function() {
  		event.cancelBubble = true;
  		infowindow.open(map, marker);
 		});
  },

  createInfoWindow: function(caption, username, photo, createdAt) {
    var infowindow = new google.maps.InfoWindow({
      content: '<img src="' + photo + '"/> <div> <b>@' + username + ' - </b> ' + $.timeago(new Date(createdAt * 1000)) + ': <br>' + caption + '</div>'
    });

    infowindow.setOptions({maxWidth:330});
    infowindow.setOptions({maxHeight:360});

    return infowindow;
  },
  
  addtoSidebar: function(photos){
    var that = this;
    $('#sidebar').empty();
    $('#sidebar').html(photos);
    that.installFancyBox();
  },

  addPhotoDivs: function(photos){
  	var that = this
  	$('#' + that.options.venue).append(photos);
  	that.installFancyBox();
  },

  installFancyBox: function(){
    $("a.fancybox").fancybox({
    		transitionIn	:	'elastic',
        closeBtn : true,
        
        overlay : false,
        helpers     : {
               title: { type: 'inside' },
               overlay : null
             }
    });
  },

});

