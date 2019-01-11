import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,
  editSaveButtonState: 'Edit',
  hasDescription: computed('model.description', function () {
    return this.get('model').get('description').length >= 1;
  }),

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
