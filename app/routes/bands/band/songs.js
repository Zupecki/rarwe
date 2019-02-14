import Route from '@ember/routing/route';
//import wait from '../../../utils/wait';
//import RSVP from 'rsvp';
import { capitalise } from '../../../helpers/capitalise';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    let model = this.modelFor('bands.band').get('songs');
    let bandModel = this.modelFor('bands.band');

    return hash({
      model,
      bandModel
    });
  },

  setupController(controller, resolvedModels) {
    controller.set('model', resolvedModels.model);
    controller.set('bandModel', resolvedModels.bandModel);
  },

  resetController(controller) {
    controller.set('songCreation', false);
  },

  actions: {
    createSong: function() {
      const controller = this.get('controller');
      const band = this.modelFor('bands.band');

      let song = this.store.createRecord('song', {
        title: capitalise(controller.get('title')),
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
