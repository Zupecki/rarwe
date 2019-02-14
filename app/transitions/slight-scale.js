import { animate } from 'liquid-fire';

// arguments are passed directly from use statements in transition rules, e.g.
// this.use('myTransition', arg1, arg2)

export default function scale(opts={}) {
  let transition = this;
  return animate(transition.oldElement, { scale: [0.9, 1] }, opts).then(function() {
    return animate(transition.newElement,{ scale: [1, 0.9] }, opts);
  });
}
