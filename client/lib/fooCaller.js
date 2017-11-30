import { ReactiveVar } from 'meteor/reactive-var';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { fooStub } from '/lib/stubs';
import { log } from './logger';

const { name, validate } = fooStub;
const fooMethod = new ValidatedMethod({
  name,
  validate,
  run(args) {
    log(3, 'valid args', args);
  },
});

export const counter = new ReactiveVar(0);

/**
 * Just wrap method calls in Promises
 */
const callMethod = (method, args) => new Promise(
  (resolve, reject) => method.call(
    args,
    (error, result) => error && reject(error) || resolve(result)
  )
);

export default async (args) => {
  log(1, 'call args', args);
  try {
    const result = await callMethod(fooMethod, args);
    log(2, 'call result', result);
  } catch (error) {
    log(0, 'call error', error);
  }
  counter.set(counter.get() + 1);
};
