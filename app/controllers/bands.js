import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { observer } from '@ember/object';

/**
 * SET FUNCTION NAME TO createBand INSTEAD OF createBand1 TO OVERRIDE BANDS ROUTE CONTROLLER
 */
export default Controller.extend({
  name: '',

  addButtonDisabled: computed('name', function() {
    return isEmpty(this.get('name'));
  }),

  alertTest: observer('currentlyLoading', function() {
    alert('LOADING!');
  }),

  actions: {

  },
});
