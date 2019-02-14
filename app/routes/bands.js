import Route from '@ember/routing/route';
//import wait from '../utils/wait';
import { capitalise } from '../helpers/capitalise';

export default Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    createBand: function() {
      let controller = this.get('controller');
      let route = this;
      let bandProps = controller.getProperties('name');

      bandProps.name = capitalise(bandProps.name);

      let band = this.store.createRecord('band', bandProps);

      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });
    },

    didTransition: function() {
      document.title = "Bands - Rock & Roll";
    },
/*
    loading(transition, origin) {
      let controller = this.controllerFor('bands');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });

      return true;
    }
*/
  }
});
