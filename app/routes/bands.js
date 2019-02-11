import Route from '@ember/routing/route';
import Band from 'rarwe/models/band';

export default Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    createBand: function() {
      // get Route's Controller instance
      let controller = this.get('controller');
      // get name from Controller, bound to input value on UI that created it
      let name = controller.get('name');
      // create Band and set name
      let band = Band.create({ name: name });
      // get model from Route:Bands and push new Band into it
      this.modelFor('bands').pushObject(band);
      // set name property to empty string, which is bound to input value on UI
      controller.set('name', '');
    },

    didTransition: function() {
      document.title = "Bands - Rock & Roll";
    },

    loading(transition, /*origin*/) {
      let controller = this.controllerFor('bands');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });

      return true;
    }
  }
});
