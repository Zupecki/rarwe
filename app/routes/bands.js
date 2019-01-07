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

    let twoBecomeOne = Song.create({
      title: 'When Two Become One',
      band: 'Spice Girls',
      rating: 4
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

    let spiceGirls = Band.create({
      name: 'Spice Girls',
      songs: [twoBecomeOne]
    });

    return [limpBizkit, matchBoxTwenty, gooGooDolls, theOffspring, ledZeppelin, incubus, spiceGirls];
  },

  /**
   * SET MODEL ON CONTROLLER IN CUSTOM FASHION
   * DEFAULT IS RETURNED MODEL ABOVE
   * THIS EXAMPLE SHOWS HOW MODEL CAN BE SWAPPED OUT OR POINTED TO SOMETHING ELSE
   * PROPERTY ADDED TO HOLD REFERENCE TO newModel
   * @param controller
   * @param model
   */
  /*
  setupController(controller, model) {
    this._super(controller, model);

    let laVidLoca = Song.create({
      title: 'Livin\' La Vida Loca',
      band: 'Ricky Martin',
      rating: 4
    });

    let fuel = Band.create({
      name: 'Fuel',
      songs: []
    });

    let rickyMartin = Band.create({
      name: 'Ricky Martin',
      songs: [laVidLoca]
    });

    let newModel = [fuel, rickyMartin];

    controller.set('model', newModel); // set model property to newModel
    this.set('newModel', newModel); // create newModel property and also set to newModel
  },
  */

  /**
   * ACTIONS LIST FOR ROUTE'S IMPLICIT CONTROLLER
   * IMPLICIT CONTROLLER ACCESSED WITH ,get('controller')
   * CONTROLLER HAS ACCESS TO PROPERTIES SET IN TEMPLATE, LIKE name
   * CREATE NEW BAND OBJECT, PUSH INTO BANDS ARRAY IN MODEL
   * RESET NAME TO EMPTY, BOUND TO VIEW INPUT VALUE
   * PRINT A BUNCH OF STUFF TO SEE INTERNALS
   * SET ROUTE MODEL TO RETURNED MODEL TO DISPLAY ORIGINAL LIST OF SONGS
   */
  actions: {
    createBand: function() {
      let name = this.get('controller').get('name');
      let band = Band.create({ name: name });
      this.modelFor('bands').pushObject(band);
      this.get('controller').set('name', '');

      /* // uncomment block of code with above setController to play with which model is used
      console.log("PRINTING CONTROLLER:");
      console.log(this.get('controller'));

      console.log("PRINTING ROUTE OBJECT:");
      console.log(this);

      console.log("PRINTING newModel PROPERTY");
      console.log(this.get('newModel'));

      console.log("PRINTING MODEL FOR ROUTE:");
      console.log(this.modelFor('bands'));
      console.log("PRINTING MODEL FUNCTION FOR ROUTE:");
      console.log(this.get('model'));

      this.get('controller').set('model', this.modelFor('bands'));
      */
    }
  }
});
