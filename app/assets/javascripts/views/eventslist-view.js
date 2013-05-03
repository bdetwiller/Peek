App.Views.EventsList = Backbone.View.extend({

	addtoSidebar: function() {
    var that = this;
    that.collection.each(function(venue) {
    	venue.addMarker();
      that.$el.append(JST["gallery/venue"]( {venue: venue} ));
    });
    
    $('#sidebar').empty(); //need to fix and hide div instead
    $('#sidebar').html(that.$el);
  },
	


})