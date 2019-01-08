import Route from '@ember/routing/route';
import Song from 'rarwe/models/song';

export default Route.extend({
  model() {
    return this.modelFor('bands.band').songs;
  },

  actions: {
    createSong: function() {
      // get controller, as it is storing the current value/title
      let controller = this.get('controller');
      // extract title
      let title = controller.get('title');
      // get band so it can be attached to song as reference
      let band = this.modelFor('bands.band');

      // create new song with input, attach band
      let song = Song.create({
        title: title,
        band: band
      });

      // push new song into band.songs
      band.get('songs').pushObject(song);
      // set controller 'title' to empty, which is bound to UI input value
      controller.set('title', '');
    },
  }
});
