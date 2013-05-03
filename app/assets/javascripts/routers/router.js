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
    if(App.Settings.currentUser !== null) {
      google.maps.event.clearListeners(map, 'click');
      var that = this;
      var friendPhotos = new App.Views.Friends();
    }
    else {
      window.location.href = "http://0.0.0.0:3000/users/sign_in"
    }
  },

  newlist: function() {
  	
  }

});