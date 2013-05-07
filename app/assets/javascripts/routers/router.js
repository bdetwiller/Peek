App.Routers.User = Backbone.Router.extend({

	routes: {
		"": "geo",
		"explore": "geo", 
		"events": "events",
		"friends" : "friends",
		"lists/new" : "newlist",
		"lists/id" : "showlist"
	},

	geo: function() {
		var that = this;
		
		var geoPhotos = new App.Views.Geo();
		geoPhotos.addSearch();
		geoPhotos.addListener();
	},

	events: function() {
		google.maps.event.clearListeners(map, 'click');
		var eventphotos = new App.Views.Events({
		});
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

  newlist: function() {
  	
  }

});