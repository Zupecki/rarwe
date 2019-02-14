import { resolve, Promise as EmberPromise } from 'rsvp';

export default function wait(value, delay) {
  //test whether value is Promise by checking it has a .then()
  let promise = value.then && typeof value.then === 'function' ? value : resolve(value);

  return new EmberPromise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}
