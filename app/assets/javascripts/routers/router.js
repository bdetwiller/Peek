App.Routers.User = Backbone.Router.extend ({
	initialize: function(map) {
		this.map = map
	},

	Routes: {
		"": "index",
		"/events": "events",
		"/friends" : "friends"

	},

	index: function() {
		var that = this;
		var geophotos = new App.Views.Geo({
			map: that.map
		});
		geophotos.addClickListener();
		console.log("hello")

	},

	events: function() {
		var that = this;
		var geophotos = new App.Views.Geo({
			map: that.map
		});
		geophotos.addClickListener();
		console.log("hello")

	}

});