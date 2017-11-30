import { Meteor } from 'meteor/meteor';

export default (bar, foobar, connection) => {
  if (foobar === 0) {
    throw new Meteor.Error('Only Chuck Norris can div by zero');
  }
  const ip = connection.httpHeaders['x-forwarded-for'] || connection.clientAddress;
  return `I got ${bar} from ${ip}.`;
};
