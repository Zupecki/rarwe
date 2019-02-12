import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server;
let headers = { 'Content-Type': 'applcation/vnd.api+json' };

moduleForAcceptance('Acceptance | bands', {
  afterEach() {
    server.shutdown();
  }
});

test('List Bands', function(assert) {

  server = new Pretender(function() {

    this.get('/bands', function() {
      let response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          },
          {
            id: 2,
            type: 'bands',
            attributes: {
              name: 'Incubus'
            }
          },
        ]
      };
      return [200, headers, JSON.stringify(response)];
    });

  });

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

    this.get('/bands', function() {
      let response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          }
        ]
      };
      return [200, headers, JSON.stringify(response)];
    });

    this.post('/bands', function() {
      let response = {
        data: {
          id: 2,
          type: 'bands',
          attributes: {
            name: 'Incubus'
          }
        }
      };
      return [200, headers, JSON.stringify(response)];
    });

    this.get('/bands/2/songs', function() {
      let response = {
        data: []
      };
      return [200, headers, JSON.stringify(response)];
    });
  });
  /**
   * SCENARIOS
   */
  visit('/bands');
  fillIn('.new-band', 'Incubus');
  click('.new-band-button');

  andThen(() => {
    assertLength(assert, '.band-link', 2, 'All band links are rendered');
    assertTrimmedText(assert, '.band-link:last', 'Incubus', 'Created band appears at end of list');
    assertElement(assert, '.nav a.active:contains("Songs")', 'Songs tab active');
  });
});

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function() {
      let response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Incubus'
            }
          }
        ]
      };
      return [200, headers, JSON.stringify(response)];
    });

    this.get('/bands/1', function() {
      let response = {
        data: {
          id: 1,
          type: 'bands',
          attributes: {
            name: 'Incubus'
          }
        }
      };
      return [200, headers, JSON.stringify(response)];
    });

    this.post('/songs', function() {
      let response = {
        data: {
          id: 1,
          type: 'songs',
          attributes: {
            name: 'Drive',
            rating: 5
          }
        }
      };
      return [200, headers, JSON.stringify(response)];
    });

    this.get('/bands/1/songs', () => {
      let response = {
        data: []
      };
      return [200, headers, JSON.stringify(response)];
    });
  });

  selectBand('Incubus');
  click('a:contains("create one")');
  fillIn('.new-song', 'Drive');
  submit('.new-song-form');

  andThen(() => {
    assertElement(assert, '.songs .song:contains("Drive")', 'Creates and displays song correctly');
  });

});
