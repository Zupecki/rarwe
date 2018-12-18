/**
 * STAR RATING COMPONENT
 * Components must have dash in their names to prevent HTML tag name clashes
 */
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  // HTML tag and CSS class names must be defined
  tagName: 'div',
  classNames: ['rating-panel'],
  maxRating: 5,

  // the next three properties are passed in via the template implementing the Component
  rating: 0,
  item: null,
  "rating-change": null, // in quotations means not a valid identifier, this is where the Controller action reference is held

  stars: computed('rating', 'maxRating', function() {
    let fullStars = this.starRange(1, this.get('rating'), 'full');
    let emptyStars = this.starRange(this.get('rating') + 1, this.get('maxRating'), 'empty');
    return fullStars.concat(emptyStars);
  }),

  starRange: function(start, end, type) {
    let starsData = [];
    for(let i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' }); // push in star object { rating: i, full: true/false }
    }
    return starsData;
  },

  actions: {
    setRating: function(newRating) {
      /**
       * this.get('controller-action-reference')(); calls passed in Controller action function held above.
       * In this case, we pass in an object with item, also passed in from calling Template and rating
       * in the form { item: this.get('item'), rating: newRating }
       */
      this.get('rating-change')({
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});
