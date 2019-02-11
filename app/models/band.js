import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  songs: DS.hasMany('song'),

  /**
   * this.set('songs', []) used to set array in initialisation, when created, to avoid instances sharing same array.
   * If this was not done, and array was instead just hard-coded as songs: [], then multiple band instances
   * would interfere with each others songs array when adding/removing songs. This is known as a:
   * "class-level mutable property"
  init() {
    this._super(...arguments);
    if(!this.get('songs')) {
      this.set('songs', []);
    }
  },
   */
});
