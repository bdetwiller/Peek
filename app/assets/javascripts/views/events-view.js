App.Views.Events = Backbone.View.extend({

  getTrendingVenues: function() {
    var that = this
    var lat = map.getCenter().lat()
    var lng = map.getCenter().lng()

    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/trending?',
      data: {ll: lat + "," + lng, limit: 10, radius: 2000, client_id: App.Settings.foursquareClientID,
            client_secret: App.Settings.foursquareClientSecret, v: 20120321},
      dataType: 'json',
      success: function(response) { 
        var venuesCollection = new App.Collections.Events(response.response.venues);
        that.displayEvents(venuesCollection);
        //that.getPhotos(venuesCollection)
      }
    });
  },

  displayEvents: function(eventsCollection) {
    App.Store.EventsView = new App.Views.EventsList({
      collection: eventsCollection,
      id: "eventlist"
    })
    App.Store.EventsView.addtoSidebar();
  },

 getPhotos: function(eventsCollection) {
    var that = this;
    var distance = 200
    var time = new Date;
    var min_time = new Date(time - 4 * 3600000); //get photos taken in last 4 hours

    eventsCollection.each(function(venue) { 

      $.ajax({
        url: 'https://api.instagram.com/v1/media/search?callback=?',
        data: {lat: venue.get("location").lat, lng: venue.get("location").lng, 
              distance: distance, min_timestamp: min_time, client_id: App.Settings.instaClientID},
        dataType: 'json',
        success: function(response) { 
          App.Collections.eventPhotos = new App.Collections.Photos(response.data);
          App.Views.eventPhotos = new App.Views.Photos({
            collection: App.Collections.eventPhotos,
            id: venue.get("name")
          });

          App.Views.eventPhotos.processPhotos();
          App.Views.eventPhotos.addtoMap();
        }
      });
    });
  }

});