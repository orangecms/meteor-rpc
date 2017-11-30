import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { fooStub } from '/lib/stubs';
const { name, validate } = fooStub;

const createMethod = ({ name, validate }, run) => new ValidatedMethod({
  name,
  validate,
  run,
});

const doSomething = (bar, foobar, connection) => {
  if (foobar === 0) {
    throw new Meteor.Error('Only Chuck Norris can div by zero');
  }
  const ip = connection.httpHeaders['x-forwarded-for'] || connection.clientAddress;
  return `I got ${bar} from ${ip}.`;
};

Meteor.startup(() => createMethod(
  fooStub,
  function run({ bar, foobar }) {
    const { userId, connection } = this;
    if (!userId) {
      throw new Meteor.Error('Access denied', 'You are not logged in!');
    }
    try {
      return doSomething(bar, foobar, connection);
    } catch (error) {
      const errorId = 'fooError123';
      console.info(errorId, error);
      throw new Meteor.Error('Internal error.', { reference: errorId });
    }
  }
));
