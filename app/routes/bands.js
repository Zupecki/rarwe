import Route from '@ember/routing/route';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

export default Route.extend({
  model() {
    /**
     * SONGS
     */

    let blackDog = Song.create({
      title: 'Black Dog',
      band: 'Led Zeppelin',
      rating: 4
    });

    let nookie = Song.create({
      title: 'Nookie',
      band: 'Limp Bizkit',
      rating: 4
    });

    let threeAM = Song.create({
      title: '3AM',
      band: 'Matchbox Twenty',
      rating: 5
    });

    let boxes = Song.create({
      title: 'Boxes',
      band: 'Goo Goo Dolls',
      rating: 3
    });

    let wishYouWereHere = Song.create({
      title: 'Wish You Were Here',
      band: 'Incubus',
      rating: 4
    });

    let push = Song.create({
      title: 'Push',
      band: 'Matchbox Twenty',
      rating: 4
    });

    let goneAway = Song.create({
      title: 'Gone Away',
      band: 'The Offspring',
      rating: 3
    });

    let goFarKid = Song.create({
      title: 'You\'re Gonna Go Far, Kid',
      band: 'The Offspring',
      rating: 4
    });

    /**
     * BANDS
     */

    let limpBizkit = Band.create({
      name: 'Limp Bizkit',
      description: 'Fred Durst, the successful wigger.',
      songs: [nookie]
    });

    let matchBoxTwenty = Band.create({
      name: 'Matchbox Twenty',
      songs: [threeAM, push]
    });

    let gooGooDolls = Band.create({
      name: 'Goo Goo Dolls',
      songs: [boxes]
    });

    let theOffspring = Band.create({
      name: 'The Offspring',
      songs: [goneAway, goFarKid]
    });

    let ledZeppelin = Band.create({
      name: 'Led Zeppelin',
      songs: [blackDog]
    });

    let incubus = Band.create({
      name: 'Incubus',
      songs: [wishYouWereHere]
    });

    let spiceGirls = Band.create({
      name: 'Spice Girls',
      description: 'From the UK, peaked in the 90s.',
      songs: []
    });

    return [limpBizkit, matchBoxTwenty, gooGooDolls, theOffspring, ledZeppelin, incubus, spiceGirls];
  },
  /**
   * ACTIONS LIST FOR ROUTE'S IMPLICIT CONTROLLER INSTANCE
   * IMPLICIT CONTROLLER ACCESSED WITH this.get('controller')
   * CONTROLLER HAS ACCESS TO PROPERTIES SET IN TEMPLATE, LIKE name
   */
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
    }
  }
});
