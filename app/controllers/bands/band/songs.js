import Controller from '@ember/controller';
import Song from 'rarwe/models/song';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

export default Controller.extend({
  title: '',
  songCreation: false,

  // watch songCreation property and array in band.songs for changes, then recompute
  canCreateSong: computed('songCreation', 'model.[]', function () {
    return this.get('songCreation') || this.get('model.length');
  }),

  addButtonDisabled: computed('title', function () {
    return isEmpty(this.get('title'));
  }),

  actions: {
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;

      song.set('rating', rating);
    },

    createSong: function () {
      let title = this.get('title');
      let band = this.get('band');

      let song = Song.create({
        title: title,
        band: band
      });

      // model is band.songs
      this.get('model').pushObject(song);

      this.set('title', '');
    },

    enableSongCreation: function () {
      this.set('songCreation', true);
    }
  }
});
