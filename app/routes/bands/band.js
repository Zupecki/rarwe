import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(params) {
    // beforeModel params is Transition object from prior route
    /*
    console.log("BEFORE MODEL:");
    console.log(params);
    */
  },

  model(params) {
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

  afterModel(params) {
    // afterModel params is the model for the route, in this case a Band object if it is found
    /*
    console.log("\nAFTER MODEL:");
    console.log(params);
    */
  }
});
