import Route from '@ember/routing/route';

export default Route.extend({
  // check if band exists first, in the case manual URL is entered, and if not default to root
  beforeModel(params) {
    if(this.modelFor('bands').findBy('slug', params.slug) === undefined) {
      this.transitionTo('/');
    }
  },

  model(params) {
    var bands = this.modelFor('bands');
    //console.log(`PARAMS: ${params.slug}`);
    //console.log(params);
    return bands.findBy('slug', params.slug);
  }
});
