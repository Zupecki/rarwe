import Controller from '@ember/controller';
import Song from 'rarwe/models/song';

export default Controller.extend({
  actions: {
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;

      song.set('rating', rating);
    },

    createSong: function() {
      if(this.get('title') == undefined) {
        this.set('title', '');
      }

      if(this.get('title').length >= 1) {
        let title = this.get('title');
        let band = this.get('band');

        let song = Song.create({
          title: title,
          band: band
        });

        // model is band.songs
        this.get('model').pushObject(song);

        this.set('title', '');
      }
    }
  }
});
