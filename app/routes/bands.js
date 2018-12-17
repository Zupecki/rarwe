import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

let Band = EmberObject.extend({
  name: null,
});

export default Route.extend({
  model() {
    let limpBizkit = Band.create({
      name: 'Limp Bizkit'
    });

    let matchBoxTwenty = Band.create({
      name: 'Matchbox Twenty'
    });

    let gooGooDolls = Band.create({
      name: 'Goo Goo Dolls'
    });

    return [limpBizkit, matchBoxTwenty, gooGooDolls];
  }
});
