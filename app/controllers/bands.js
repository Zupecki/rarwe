import Controller from '@ember/controller';
import Band from 'rarwe/models/band';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

/**
 * SET FUNCTION NAME TO createBand INSTEAD OF createBand1 TO OVERRIDE BANDS ROUTE CONTROLLER
 */
export default Controller.extend({
  name: '',

  addButtonDisabled: computed('name', function() {
    return isEmpty(this.get('name'));
  }),

  actions: {
    createBand: function() {
      let name = this.get('name');
      let band = Band.create({ name: name });
      this.get('model').pushObject(band);
      this.set('name', '');
      this.transitionToRoute('bands.band.songs', band);
    }
  }
});
