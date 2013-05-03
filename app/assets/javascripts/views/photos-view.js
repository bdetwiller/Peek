App.Views.Photos = Backbone.View.extend({

	processPhotos: function(){
    var that = this;
    that.collection.each(function(photo) {
      that.$el.append(JST["gallery/image"]( {photo: photo} ));
    });

    that.addtoSidebar(that.$el);
  },

  addtoMap: function(){ 
 		var that = this;   
    that.collection.each(function(photo) {
      var LatLng = new google.maps.LatLng(photo.get("location").latitude, photo.get("location").longitude);
      var url = photo.get("images").thumbnail.url
      if (photo.get("caption")) { 
    			title = photo.get("caption").text;
    	} else {
    		title = null;
    	}
      that.setOverlay(LatLng, url, title);
    });
  },


  setOverlay: function(position, photoURL, title){

		var photoWidth   = 25
		var photoHeight  = 25

		var borderWidth  = 2 
		var borderRadius = 2 
		var borderColor  = "white"

		var boxShadow    = "2px 2px 10px black"
		this.photoOverlay = new google.maps.OverlayView();


		this.photoOverlay.position_ = position
		this.photoOverlay.photoUrl_ = photoURL
		this.photoOverlay.title_    = title || ''
		this.photoOverlay.div_      = null

		this.photoOverlay.onAdd = function() {
			var div = document.createElement('div')

			div.style.width           = photoWidth + "px"
			div.style.height          = photoHeight + "px"

			div.style.backgroundColor = borderColor // so it's not transparent
			div.style.borderStyle     = "solid"
			div.style.borderWidth     = borderWidth + "px"
			div.style.borderColor     = borderColor
			div.style.borderRadius    = borderRadius + "px"

			div.style.boxShadow       = boxShadow

			div.style.position        = "absolute"
			div.style.cursor          = "pointer"
			div.title                 = this.title_

			var img = document.createElement("img")

			img.src          = this.photoUrl_
			img.style.width  = photoWidth + "px"
			img.style.height = photoHeight + "px"

			div.appendChild(img)

			this.div_ = div

			var panes = this.getPanes()
			panes.overlayMouseTarget.appendChild(div)

			var overlay = this;

			google.maps.event.addDomListener(div, 'click', function() {
				google.maps.event.trigger(overlay, 'click')
			})


			// google.maps.event.addListener(this.photoOverlay, 'click', function() {		
   //   		OpenInfoWindow(
   //   			content: '<IMG BORDER="0" ALIGN="Left" SRC="' + this.photoUrl_ + '">' + this.title_
   //   		)
		// })
		};

		this.photoOverlay.onRemove = function() {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		};

		this.photoOverlay.draw = function() {
			var that = this
			var overlayProjection = this.getProjection()

			var point = overlayProjection.fromLatLngToDivPixel(this.position_)

			var div = this.div_;
			div.style.left = point.x - (photoWidth/2) + 'px';
			div.style.top  = point.y - (photoHeight/2) + 'px';
		};

		this.photoOverlay.setMap(map);


	},

  addtoSidebar: function(photos){
    var that = this;
    $('#sidebar').empty();
    $('#sidebar').html(photos);
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
  },

});

