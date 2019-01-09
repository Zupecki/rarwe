import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  beforeModel(transition) {
    // beforeModel params is Transition object from prior route
    /*
    console.log("BEFORE MODEL:");
    console.log(params);
    */
  },

  model(params, transition) {
    // model params comes as object containing key:value pairs of dynamic URL elemtents, like ':slug'
    /*
    console.log("\nMODEL:");
    console.log(params);
    */

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

  afterModel(model, transition) {
    // afterModel has model and transition objects, model is bands.band in this context

    console.log("\nAFTER MODEL ON BAND ROUTE:");
    console.log(model);

  }
});
