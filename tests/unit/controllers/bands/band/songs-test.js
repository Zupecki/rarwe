import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:bands/band/songs', 'Unit | Controller | bands/band/songs', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('songCreation', function(assert) {
  assert.expect(3);

  let controller = this.subject();
  let songs = [];
  controller.set('model', songs);

  controller.set('songCreation', false);
  assert.ok(!controller.get('canCreateSong'), "Cannot create songs if song creation un-started and no songs");

  controller.set('songCreation', true);
  assert.ok(controller.get('canCreateSong'), "Can create songs if song creation started");

  controller.set('songCreation', false);
  songs = [
    EmberObject.create({ id:1, title: 'Drive', rating: 5 }),
    EmberObject.create({ id:1, title: 'Mexico', rating: 4 })
  ];
  controller.set('model', songs);
  assert.ok(controller.get('canCreateSong'), "Can create songs if songs already present on band");
});
