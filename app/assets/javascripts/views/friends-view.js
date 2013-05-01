App.Views.Friends = Backbone.View.extend({

  initialize: function(){
    var that = this;
    // var user = new App.Models.User({id: App.Settings.currentUser.id})
    // user.fetch();
    // for if we need to hide tokens

    that.getFeed();
  },

  getFeed: function(user_auth) {
      var that = this;

    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/feed?callback=?',
      data: {access_token: App.Settings.auth, count: 30},
        dataType: 'json',
        success: function(response) { that.processPhotos(response); }
      });
  },

  processPhotos: function(response){
    var that = this;

    that.$el.empty();
    App.Collections.friendPhotos = new App.Collections.Photos(response.data);
    console.log(App.Collections.friendPhotos)
    App.Collections.freindPhotos.hasLocation();
    App.Collections.friendPhotos.each(function(photo) {
      that.$el.append(JST["gallery/image"]( {photo: photo} ));
    });
    that.addtoGallery(that.$el);

  },

  // addtoMap: function(){
  //   var image = 'beachflag.png';
  //     var myLatLng = new google.maps.LatLng(-33.890542, 151.274856);
  //     var beachMarker = new google.maps.Marker({
  //         position: myLatLng,
  //         map: map,
  //         icon: image
  //     });
  //   }
  //   App.Collections.eventPhotos.each(function(photo) {
  //     var LatLng = photo.attributes.
  //     var marker = new google.maps.Marker({
  //       position:
  //     })
  //   });
  // },

  addtoGallery: function(photos){
    var that = this;
    $('#gallery').empty();
    $('#gallery').html(photos);
    that.installFancyBox();
  },

  installFancyBox: function(){
    $("a.fancybox").fancybox({
    		transitionIn	:	'elastic',
        closeBtn : false,
        overlay : false,
        helpers     : {
               title: { type: 'inside' },
               overlay : null
             }
    });
  }



})