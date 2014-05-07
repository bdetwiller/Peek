App.Views.Events = Backbone.View.extend({

  getTrendingVenues: function() {
    var that = this
    var lat = map.getCenter().lat()
    var lng = map.getCenter().lng()

    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/trending?',
      data: {ll: lat + "," + lng, limit: 10, radius: 15000, client_id: App.Settings.foursquareClientID,
            client_secret: App.Settings.foursquareClientSecret, v: 20120321},
      dataType: 'json',
      success: function(response) { 
        if(response.response.venues.length === 0) {
          that.noVenues();
        } else {
          App.Store.venuesCollection = new App.Collections.Events(response.response.venues);
          that.getPhotos(App.Store.venuesCollection);
          that.displayEvents(App.Store.venuesCollection);
        }
      }
    });
  },

  noVenues: function() {
    $('#sidebar').empty();
    $('#sidebar').html(JST["gallery/novenues"]());
  },

  displayEvents: function(eventsCollection) {
    App.Store.EventsView = new App.Views.EventsList({
      collection: eventsCollection,
      id: "eventlist",
      el: "#sidebar"
    })
    App.Store.EventsView.$el.empty();
    App.Store.EventsView.empty();
  },

  getPhotos: function(eventsCollection) {
    var that = this;
    var distance = 300
    var time = new Date();
    var min_time = Math.round((new Date(time - 10 * 3600000)).getTime()/1000);

    eventsCollection.each(function(venue) {
      var lat = venue.get("location").lat
      var lng = venue.get("location").lng
      var run_flag = 0 
      that.instagramRequest(min_time, venue, distance, lat, lng, run_flag);
    });
  },

  instagramRequest: function(min_time, venue, distance, lat, lng, run_flag) {
    var that = this
    $.ajax({
      url: 'https://api.instagram.com/v1/media/search?callback=?',
      data: {min_timestamp: min_time, lat: lat, lng: lng, 
            distance: distance, client_id: App.Settings.instaClientID},
      dataType: 'json',
      success: function(response) { 
        if(response.meta.code === 200 && response.data.length === 0) {
          App.Store.venuesCollection.remove(venue.get("id"));
          if(App.Store.venuesCollection.length === 0) {
            that.noVenues();
          }
        } else if (response.meta.code === 400 && run_flag < 3) { //if fails make request again
          run_flag ++;
          that.instagramRequest(min_time, venue, distance, lat, lng, run_flag);
        } else if (response.meta.code === 200) {
          that.handleResponse(response, venue);
        }
      }
    }); 
  },

  handleResponse: function(response, venue) {
    var that = this
    App.Store.EventsView.addtoSidebar(venue);
    eventPhotoCollection = new App.Collections.Photos(response.data);
      eventPhotoView = new App.Views.Photos({
        collection: eventPhotoCollection,
        id: venue.get("id") + "_photos",
        venue: venue.get("id"),
        forEvent: true
      });
      eventPhotoView.processPhotos();
  },
});