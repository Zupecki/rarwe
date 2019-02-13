import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('bands.band').get('songs');
  },
  resetController(controller) {
    controller.set('songCreation', false);
  },

  actions: {
    createSong: function() {
      const controller = this.get('controller');
      const band = this.modelFor('bands.band');

      let song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });

      song.save().then(function() {
        controller.set('title', '');
      });
    },

    didTransition: function() {
      let band = this.modelFor('bands.band');
      document.title = `${band.get('name')} songs - Rock & Roll`;
    },
  }
});
