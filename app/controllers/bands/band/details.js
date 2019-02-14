import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,
  editSaveButtonState: 'Edit',
  descriptionMessage: computed('model.description', 'isEditing', function () {
    return this.get('model').get('description') || this.get('isEditing');
  }),

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    save: function() {
      this.set('isEditing', false);
      return true;
    },
    leave: function() {
      this.set('isEditing', false);
    }
  }
});
