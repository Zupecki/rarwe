import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('star-rating', 'Integration | Component | star rating', {
  integration: true
});

test('Renders full and empty stars correctly', function(assert) {
  assert.expect(6);

  let song = EmberObject.create({ rating: 4 });

  this.set('song', song);
  this.set('maxRating', 5);
  this.render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);
  assert.equal(this.$('.glyphicon-star').length, 4, 'Correct amount of full stars shown');
  assert.equal(this.$('.glyphicon-star-empty').length, 1, 'Correct amount of empty stars shown');

  this.set('maxRating', 10);
  assert.equal(this.$('.glyphicon-star').length, 4, 'Correct amount of full stars shown after updated maxRating');
  assert.equal(this.$('.glyphicon-star-empty').length, 6, 'Correct amount of empty stars shown after updated maxRating');

  this.set('song.rating', 2);
  assert.equal(this.$('.glyphicon-star').length, 2, 'Correct amount of full stars shown after updated song.rating');
  assert.equal(this.$('.glyphicon-star-empty').length, 8, 'Correct amount of empty stars shown after updated song.rating');
});
