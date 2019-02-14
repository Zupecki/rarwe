import Route from '@ember/routing/route';
import wait from '../utils/wait';

export default Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    createBand: function() {
      // get Route's Controller instance
      let controller = this.get('controller');
      var route = this;

      var band = this.store.createRecord('band', controller.getProperties('name'));

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
