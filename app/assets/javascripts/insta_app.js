window.App = {

 	Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  Settings: {
  	clientID: "c8f7973e4c2a40909deb8ac3c5c11843", 
  	clientSecret: "c02752f7a0d54e32b510859841d67ac5"
  },



  
  initialize: function () {
   
    this.installMap();
    new App.Routers.User();    
    Backbone.history.start();

    this.addClickListener();

   // new TD.Routers.TasksRouter($content, tasks);
    // begin listening for navigation events
    //Backbone.history.start();
  },
  
  installMap: function () {
	    var mapOptions = {
	    center: new google.maps.LatLng(37.760, -122.428),
	    zoom: 12,
	    disableDefaultUI: true,          
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoomControl: true,
	    overviewMapControl: true
	  	};

	  	map = new google.maps.Map(document.getElementById('map'), mapOptions);
  },

  addClickListener: function() {
		var that = this
	  google.maps.event.addListener(that.map, 'click', function(event){
	    var currentPos = {lat: event.latLng.lat(), lng: event.latLng.lng(), dist: '1000'};
	    console.log("currentPos");

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


};
