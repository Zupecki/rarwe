import { helper } from '@ember/component/helper';

export function capitalise(input) {
  let words = input.toString().split(' ').map(function(word) {
    return word.toLowerCase().capitalize();
  });

  return words.join(' ');
}

export default helper(capitalise);
