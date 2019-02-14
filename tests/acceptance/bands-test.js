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
      title: 'Drive',
      rating: 5
    }
  },
  {
    id: 2,
    attributes: {
      title: 'Mexico',
      rating: 4
    }
  },
  {
    id: 3,
    attributes: {
      title: 'Oil and Water',
      rating: 3
    }
  },
  {
    id: 4,
    attributes: {
      title: 'Wish you were here',
      rating: 5
    }
  },
  {
    id: 5,
    attributes: {
      title: 'Pardon me',
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
    httpStubs.stubSongs(this, 2, []);
    httpStubs.stubCreateSong(this, 1);
  });
  /**
   * SCENARIOS
   */
  selectBand('Incubus');
  click('a:contains("create one")');
  fillIn('.new-song', '11am');
  submit('.new-song-form');
  andThen(() => {
    assertElement(assert, '.songs .song:contains("11am")', 'Creates and displays song correctly');
  });
});

test('Sort songs in differing ways', function(assert) {
  /**
   * SERVER SETUP
   * @type {Pretender}
   */
  server = new Pretender(function() {
    httpStubs.stubBands(this, bands);
    httpStubs.stubSongs(this, 2, songs);
  });
  /**
   * SCENARIOS
   */
  selectBand('Incubus');
  andThen(() => {
    assert.equal(currentURL(), '/bands/2/songs', 'Correct URL for band');
    assertTrimmedText(assert, '.song:first', 'Drive', 'The first song is the highest ranked, first in alphabet');
    assertTrimmedText(assert, '.song:last', 'Oil And Water', 'The first song is the lowest ranked, last in alphabet');

    click('button.sort-title-desc');
    andThen(() => {
      assert.equal(currentURL(), '/bands/2/songs?sort=titleDesc', 'Correct URL with sort title query param');
      assertTrimmedText(assert, '.song:first', 'Wish You Were Here', 'The first song is the last alphabetically');
      assertTrimmedText(assert, '.song:last', 'Drive', 'The last song is the first alphabetically');

      click('button.sort-rating-asc');
      andThen(() => {
        assert.equal(currentURL(), '/bands/2/songs?sort=ratingAsc', 'Correct URL with sort rating query param');
        assertTrimmedText(assert, '.song:first', 'Oil And Water', 'The first song is the lowest rating, first in alphabet');
        assertTrimmedText(assert, '.song:last', 'Wish You Were Here', 'The last song is the highest rating, last in alphabet');
      });
    });
  });
});

test('Search songs', function(assert) {
  /**
   * SERVER SETUP
   * @type {Pretender}
   */
  server = new Pretender(function() {
    httpStubs.stubBands(this, bands);
    httpStubs.stubSongs(this, 2, songs);
  });
  /**
   *SCENARIOS
   */
  visit('/bands/2');
  fillIn('.search-field', 'me');

  andThen(() => {
    assertLength(assert, '.song', 2, 'Correct amount of songs filtered with Search');

    click('button.sort-title-desc');
    andThen(() => {
      assertTrimmedText(assert, '.song:first', 'Pardon Me', 'First song filtered with Search, last in alphabet');
      assertTrimmedText(assert, '.song:last', 'Mexico', 'Last song filtered with Search, first in alphabet');
    });
  });
});
