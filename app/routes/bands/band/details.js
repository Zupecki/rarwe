import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('bands.band');
  },
  actions: {
    didTransition: function() {
      let band = this.modelFor('bands.band');
      document.title = `${band.get('name')} details - Rock & Roll`;
    },
    willTransition: function(transition) {
      let controller = this.get('controller');

      if(controller.get('isEditing')) {
        let leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if(leave) {
          controller.send('editDescription');
        }
        else {
          transition.abort();
        }
      }
    }
  }
});
