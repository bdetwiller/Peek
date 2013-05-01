App.Routers.User = Backbone.Router.extend({

	routes: {
		"": "index",
		"events": "events",
		"friends" : "friends"
	},

	index: function() {
		var that = this;
		var geophotos = new App.Views.Events();
		geophotos.addListener();
	},

	events: function() {
    console.log("i'm in events");
		var that = this;
		var geophotos = new App.Views.Events();
		geophotos.addListener();

	},

  friends: function() {
    if(App.Settings.currentUser !== null) {
      google.maps.event.clearListeners(map, 'click');
      console.log("im in friends");
      var that = this;
      var friendPhotos = new App.Views.Friends();
    }
    else {
      window.location.href = "http://0.0.0.0:3000/users/sign_in"
    }
  }

});