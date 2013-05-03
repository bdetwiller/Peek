App.Views.EventsList = Backbone.View.extend({

	addtoSidebar: function() {
    var that = this;
    that.$el.empty();

    that.collection.each(function(venue) {
    	venue.addMarker();
      that.$el.append(JST["gallery/venue"]( {venue: venue} ));

      $('#' + venue.get("id")).click(function () { //need to fix
        console.log("fired");
        $('#' + venue.get("id") + "_photos").slideToggle();
      });
    });
    
  },
	


})

// $('#sidebar').html(that.$el);