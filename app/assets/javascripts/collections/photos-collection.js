App.Collections.Photos = Backbone.Collection.extend({
  model: App.Models.Photo,

  hasLocation: function() {
    return _(this.filter(function (photo) { 
    	console.log(photo.get("location") !== null);
    	return photo.get("location") !== null
    }));
  }


});

//ryan questions 1)model 2)organizing views within view