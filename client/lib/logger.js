import { ReactiveVar } from 'meteor/reactive-var';

export const logger = new ReactiveVar([]);

const colors = {
  0: 'rgb(250, 150, 150)',
  1: 'rgb(150, 250, 150)',
  2: 'rgb(150, 200, 250)',
  3: 'rgb(250, 250, 250)',
};

export function getColor(value) {
  return colors[value] || colors[0];
}

export function log(level, source, msg) {
  const message = JSON.stringify(msg, null, 2);
  const timestamp = new Date().toISOString();
  logger.set([{ level, source, message, timestamp }].concat(logger.get()));
}
