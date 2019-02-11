import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  afterModel(model, transition) {
    let description = model.get('description');

    if(isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    }
    else {
      this.transitionTo('bands.band.details');
    }
  }
});
