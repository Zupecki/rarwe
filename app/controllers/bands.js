import Controller from '@ember/controller';
import Band from 'rarwe/models/band';

/**
 * SET FUNCTION NAME TO createBand INSTEAD OF createBand1 TO OVERRIDE BANDS ROUTE CONTROLLER
 */
export default Controller.extend({
  actions: {
    createBand1: function() {
      let name = this.get('name');
      let band = Band.create({ name: name });
      this.get('model').pushObject(band);
      this.set('name', '');
    }
  }
});
