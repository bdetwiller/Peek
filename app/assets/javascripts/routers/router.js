App.Routers.User = Backbone.Router.extend ({

	routes: {
		"": "index",
		"/events": "events",
		"/friends" : "friends"

	},

	index: function() {
		var that = this;
		var geophotos = new App.Views.Events();
		geophotos.addListener();
	},

	events: function() {
		var that = this;
		var geophotos = new App.Views.Events({
			map: that.map
		});
		geophotos.addClickListener();


	}

});