App.Routers.User = Backbone.Router.extend ({

	routes: {
		"": "index",
		"/events": "events",
		"/friends" : "friends"

	},

	index: function() {
    console.log("reached index");
		var that = this;
		var geophotos = new App.Views.Geo();
		geophotos.addListener();
	},

	events: function() {
		var that = this;
		var geophotos = new App.Views.Geo({
			map: that.map
		});
		geophotos.addClickListener();
		console.log("reached events");

	}

});