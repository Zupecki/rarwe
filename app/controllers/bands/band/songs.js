import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  title: '',
  songCreation: false,
  sortBy: 'ratingDesc',
  searchTerm: '',
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  createSongInputPlaceholder: computed('bandModel.name', function() {
    let bandName = this.get('bandModel.name');
    return `New ${bandName} song`;
  }),

  /**
   * watch songCreation property and array in band.songs for changes, then recompute
   * return first true from left to right:
   * 1. if songCreation changes to true (via enableSongCreation action), then true || false, which returns true
   * 2. if 2 songs already exist, then return is false || 2, which returns true since the first
   * resolve is false, and skipped, and 2 evaluates to true since 0 = false, >0 = true
   * 3. if songCreation is false, and model.length is 0, then false || false and rightmost value returned
    */
  canCreateSong: computed('songCreation', 'model', function () {
    return this.get('songCreation') || this.get('model.length');
  }),

  addButtonDisabled: computed('title', function () {
    return isEmpty(this.get('title'));
  }),

  sortProperties: computed('sortBy', function() {
    let options = {
      'ratingAsc': 'rating:asc,title:asc',
      'ratingDesc': 'rating:desc,title:asc',
      'titleAsc': 'title:asc',
      'titleDesc': 'title:desc'
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: sort('matchingSongs', 'sortProperties'),

  matchingSongs: computed('model.@each.title', 'searchTerm', function() {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  actions: {
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;

      if(song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      return song.save();
    },

    createSong: function () {
      //console.log('create song action fired off on route:songs.js Controller');

      // cause route action of same name to also fire in 'bubbling' behaviour
      return true;
    },

    enableSongCreation: function () {
      this.set('songCreation', true);
    },

    setSorting: function(sortType) {
      this.set('sortBy', sortType);
    },
  }
});
