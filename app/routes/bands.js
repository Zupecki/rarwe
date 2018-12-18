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
      rating: 4.5
    });

    let boxes = Song.create({
      title: 'Boxes',
      band: 'Goo Goo Dolls',
      rating: 3
    });

    let wishYouWereHere = Song.create({
      title: 'Wish You Were Here',
      band: 'Incubus',
      rating: 4.5
    });

    let push = Song.create({
      title: 'Push',
      band: 'Matchbox Twenty',
      rating: 4
    });

    let goneAway = Song.create({
      title: 'Gone Away',
      band: 'The Offspring',
      rating: 3.5
    });

    let goFarKid = Song.create({
      title: 'You\'re Gonna Go Far, Kid',
      band: 'The Offspring',
      rating: 4.5
    });

    /**
     * BANDS
     */

    let limpBizkit = Band.create({
      name: 'Limp Bizkit',
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

    return [limpBizkit, matchBoxTwenty, gooGooDolls, theOffspring, ledZeppelin, incubus];
  },

  actions: {
    createBand: function() {
      console.log("CREATING BAND...");
      let name = this.get('controller').get('name');
      let band = Band.create({ name: name });
      this.modelFor('bands').pushObject(band);
      this.get('controller').set('name', '');
    }
  }
});
