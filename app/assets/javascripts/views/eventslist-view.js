App.Views.EventsList = Backbone.View.extend({

	addtoSidebar: function() {
    var that = this;
    that.$el.empty();

    that.collection.each(function(venue) {
    	venue.addMarker();
      that.$el.append(JST["gallery/venue"]( {venue: venue} ));

      $('#' + venue.get("id") + " .venue-content").click(function () { 
        $('#' + venue.get("id") + "_photos").slideToggle();
      });

      $('#' + venue.get("id") + " .venue-icon").click(function () { 
        $('#' + venue.get("id") + "_photos").slideToggle();
      });
    });
    
  },
	


})

// $('#sidebar').html(that.$el);