import Controller from '@ember/controller';
import Song from 'rarwe/models/song';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

export default Controller.extend({
  title: '',

  addButtonDisabled: computed('title', function() {
    return isEmpty(this.get('title'));
  }),

  noSongs: computed('model', function () {
    console.log('triggered');
    return this.get('model').length == 0 ? true : false;
  }),

  actions: {
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;

      song.set('rating', rating);
    },

    createSong: function() {
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
});
