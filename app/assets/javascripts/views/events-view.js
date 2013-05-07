App.Views.Events = Backbone.View.extend({

  getTrendingVenues: function() {
    var that = this
    var lat = map.getCenter().lat()
    var lng = map.getCenter().lng()
    console.log(lat + " " + lng);

    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/trending?',
      data: {ll: lat + "," + lng, limit: 10, radius: 10000, client_id: App.Settings.foursquareClientID,
            client_secret: App.Settings.foursquareClientSecret, v: 20120321},
      dataType: 'json',
      success: function(response) { 
        var venuesCollection = new App.Collections.Events(response.response.venues);
        that.displayEvents(venuesCollection);
        that.getPhotos(venuesCollection);
      }
    });
  },

  displayEvents: function(eventsCollection) {
    App.Store.EventsView = new App.Views.EventsList({
      collection: eventsCollection,
      id: "eventlist",
      el: "#sidebar"
    })
    App.Store.EventsView.empty();
    App.Store.EventsView.addtoSidebar();
  },

 getPhotos: function(eventsCollection) {
    var that = this;
    var distance = 300
    var time = new Date();
    var min_time = Math.round((new Date(time - 24 * 3600000)).getTime()/1000);

    eventsCollection.each(function(venue) { 
      $.ajax({
        url: 'https://api.instagram.com/v1/media/search?callback=?',
        data: {min_timestamp: min_time, lat: venue.get("location").lat, lng: venue.get("location").lng, 
              distance: distance, client_id: App.Settings.instaClientID},
        dataType: 'json',
        success: function(response) { 
          console.log(response);
          eventPhotoCollection = new App.Collections.Photos(response.data);
          eventPhotoView = new App.Views.Photos({
            collection: eventPhotoCollection,
            id: venue.get("id") + "_photos",
            venue: venue.get("id"),
            forEvent: true
          });

          eventPhotoView.processPhotos();
        }
      });
    });
  }

});