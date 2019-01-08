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
   * ACTIONS LIST FOR ROUTE'S IMPLICIT CONTROLLER INSTANCE
   * IMPLICIT CONTROLLER ACCESSED WITH this.get('controller')
   * CONTROLLER HAS ACCESS TO PROPERTIES SET IN TEMPLATE, LIKE name
   */
  actions: {
    // overwritten by custom Controller action

    createBand: function() {
      // get Route's Controller instance
      let routeController = this.get('controller');

      if(routeController.get('name') == undefined) {
        routeController.set('name', '');
      }

      if(routeController.get('name').length >= 1) {
        // get name from Controller, bound to input value on UI that created it
        let name = routeController.get('name');
        // create Band and set name
        let band = Band.create({ name: name });
        // get model from Route:Bands and push new Band into it
        this.modelFor('bands').pushObject(band);
        // set name property to empty string, which is bound to input value on UI
        routeController.set('name', '');

        // get model set on Controller and push new Band, which is different to ModelFor if setupController uncommented
        // if setupController not uncommented, then below code will add second entry of same band
        // after setTimeout, swap model to see binding
        /*
        routeController.get('model').pushObject(band);
        setTimeout(() => {
          routeController.set('model', this.modelFor('bands'));
        }, 3000);
        */
      }

      /**
       * PLAY TESTING FOR ACTION
       * uncomment setupController() code above for newModel
       */

      /*
      // test binding by changing the name property after set amount of time
      setTimeout(() => {
        this.get('controller').set('name', 'Value Reset');
      },3000);

      console.log("PRINTING ROUTE:");
      console.log(this);

      console.log("PRINTING ROUTE CONTROLLER:")
      console.log(`${routeController}`);
      console.log(routeController);
      console.log(this.get('controller'));

      console.log("PRINTING ROUTE ACTIONS:");
      console.log(this.get('actions'));

      console.log("PRINTING newModel PROPERTY");
      console.log(this.get('newModel'));

      console.log("PRINTING MODEL FOR ROUTE:");
      console.log(this.modelFor('bands'));
      console.log("PRINTING MODEL FUNCTION FOR ROUTE:");
      console.log(this.get('model'));

      this.get('controller').set('model', this.modelFor('bands'));
      */
    },
    testFunction: function() {
      // some code here
      console.log(`TEST PROP: ${this.get('controller').get('testProp')}`);
    }
  }
});
