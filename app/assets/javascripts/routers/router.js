App.Routers.User = Backbone.Router.extend({

	routes: {
		"": "index",
		"geo" : "geo",
		"geo/:query": "geo", 
		"events": "events",
		"friends" : "friends",
	},

	index: function() {
		var geoPhotos = new App.Views.Geo();
		geoPhotos.addListener();
		geoPhotos.addSearch();
		geoPhotos.loadInfo();
	},

	geo: function(query) {
		if(query) {
			var geoPhotos = new App.Views.Geo();
			geoPhotos.handleQuery(query)
		}
		var geoPhotos = new App.Views.Geo();
		geoPhotos.addListener();
		geoPhotos.addSearch();
	},

	events: function() {
		google.maps.event.clearListeners(map, 'click');
		map.setZoom(13);
		var eventphotos = new App.Views.Events({});
		eventphotos.getTrendingVenues();
	},

  friends: function() {
    if(App.Settings.auth !== undefined) {
      google.maps.event.clearListeners(map, 'click');
      var that = this;
      var friendPhotos = new App.Views.Friends();
    }
    else {
    	console.log('you are not logged in');
      $("#myModal").modal("show");
    }
  },

});