import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;

      song.set('rating', rating);
    }
  }
});
