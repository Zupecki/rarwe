import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  afterModel(model, transition) {
    let description = model.get('description');

    console.log("\nAFTER MODEL ON BAND/INDEX ROUTE:");
    console.log(model);

    if(isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    }
    else {
      this.transitionTo('bands.band.details');
    }
  }
});
