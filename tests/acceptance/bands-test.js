import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

let server;

let bands = [
  {
    id: 1,
    attributes: {
      name: 'Radiohead'
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Incubus'
    }
  }
];

let songs = [
  {
    id: 1,
    attributes: {
      name: 'Drive',
      rating: 5
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Mexico',
      rating: 4
    }
  }
];

moduleForAcceptance('Acceptance | bands', {
  afterEach() {
    server.shutdown();
  }
});

test('List Bands', function(assert) {
  /**
   * SERVER SETUP
   * @type {Pretender}
   */
  server = new Pretender(function() {
    httpStubs.stubBands(this, bands);
  });
  /**
   * SCENARIOS
   */
  visit('/bands');

  andThen(() => {
    assertLength(assert, '.band-link', 2, 'All band links rendered');
    assertLength(assert, '.band-link:contains("Radiohead")', 1, 'The first band link contains the band name');
    assertLength(assert, '.band-link:contains("Incubus")', 1, 'The other band link contains the band name');
  });
});

test('Create new band', function(assert) {
  /**
   * SERVER SETUP
   * @type {Pretender}
   */
  server = new Pretender(function() {
    httpStubs.stubBands(this, bands);
    httpStubs.stubCreateBand(this, 3);
    httpStubs.stubSongs(this, 3, []);
  });
  /**
   * SCENARIOS
   */
  visit('/bands');
  fillIn('.new-band', 'Bodyjar');
  click('.new-band-button');

  andThen(() => {
    assertLength(assert, '.band-link', 3, 'All band links are rendered');
    assertTrimmedText(assert, '.band-link:last', 'Bodyjar', 'Created band appears at end of list');
    assertElement(assert, '.nav a.active:contains("Songs")', 'Songs tab active');
  });
});

test('Create a new song in two steps', function(assert) {
  /**
   * SERVER SETUP
   * @type {Pretender}
   */
  server = new Pretender(function() {
    httpStubs.stubBands(this, bands);
    httpStubs.stubSongs(this, 2, songs);
    httpStubs.stubCreateSong(this, 3);
  });
  /**
   * SCENARIOS
   */
  selectBand('Incubus');
  //click('a:contains("create one")');
  fillIn('.new-song', '11AM');
  submit('.new-song-form');

  andThen(() => {
    assertElement(assert, '.songs .song:contains("11AM")', 'Creates and displays song correctly');
  });

});

