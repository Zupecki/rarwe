import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  beforeModel(transition) {

  },

  model(params, transition) {
    // model params comes as object containing key:value pairs of dynamic URL elements, like ':slug'
    console.log("\nMODEL:");
    console.log(params);

    let bands = this.modelFor('bands');
    let band = bands.findBy('slug', params.slug);
    // check if band exists first, in the case manual URL is entered, and if not default to root else return band
    if(band === undefined) {
      this.transitionTo('/');
    }
    else {
      return band;
    }
  },
});
