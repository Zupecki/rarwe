import Route from '@ember/routing/route';
import { resolve } from 'rsvp';

export default Route.extend({
  model(params, /*transition*/) {
    // model params comes as object containing key:value pairs of dynamic URL elements, like ':slug'

    // check if band exists first, in the case manual URL is entered, and if not default to root else return band
    let band = this.store.findRecord('band', params.id);

    if(!band) {
      this.transitionTo('/');
    }
    else {
      return band;
    }
  },
});
