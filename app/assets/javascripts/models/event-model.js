App.Models.Event = Backbone.Model.extend({

	addMarker: function() {
		var that = this;

		var latlng = new google.maps.LatLng(that.get("location").lat, that.get("location").lng)
		var name = that.get("name")
		var icon = that.get('categories')[0].icon.prefix + "44.png"

		var marker = new google.maps.Marker({
			map: map,
			position: latlng,
			animation: google.maps.Animation.DROP,
			title: name,
			icon: icon
		});

		markersArray.push(marker);

		that.addListeners(marker);
	},

	addListeners: function(marker) {
		var that = this;

		google.maps.event.addListener(marker, "mouseover", function() {
	    $('#' + that.id + " .venue-content").addClass("highlight");
		  $('#sidebar').scrollTo('#' + that.id, 800);
		});

		google.maps.event.addListener(marker, "mouseout", function() {
	     $('#' + that.id + " .venue-content").removeClass("highlight");
		});

		google.maps.event.addListener(marker, "click", function() {
			 $('#' + that.id + "_photos").slideToggle();
		});

	},

});