import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,
  editSaveButtonState: 'Edit',

  /*
  isEditing: computed('', function () {

  }),
  */
  actions: {
    editDescription: function () {
      this.set('isEditing', !this.get('isEditing'));

      if(!this.get('isEditing')) {
        this.set('editSaveButtonState', 'Edit');
      }
      else {
        this.set('editSaveButtonState', 'Save');
        console.log(this.get('model').get('description'));
      }
    }
  }
});
