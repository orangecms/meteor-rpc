import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import './main.html';
import callFoo, { counter } from './lib/fooCaller';
import { logger, getColor } from './lib/logger';

const loglevel = new ReactiveVar(2);

const helloArgs = { bar: 'bar', foobar: 2 };
Template.hello.helpers({
  getArgs() {
    return JSON.stringify(helloArgs);
  },
});
Template.hello.events({
  'click button'() {
    callFoo(helloArgs);
  },
});

const cruelArgs = { bar: 'bar', foobar: 0 };
Template.cruel.helpers({
  getArgs() {
    return JSON.stringify(cruelArgs);
  },
});
Template.cruel.events({
  'click button'() {
    callFoo(cruelArgs);
  },
});

const worldArgs = { bar: 'bar' };
Template.world.helpers({
  getArgs() {
    return JSON.stringify(worldArgs);
  },
});
Template.world.events({
  'click button'() {
    callFoo(worldArgs);
  },
});

Template.logarea.events({
  'change select'({ target }) {
    loglevel.set(target.value);
  },
  'click button'() {
    logger.set([]);
    counter.set(0);
  },
});

Template.logarea.helpers({
  counter() {
    return counter.get();
  },
  logs() {
    const lvl = loglevel.get();
    const entries = logger.get().filter(({ level }) => level <= lvl);
    return entries.map(e => ({ ...e, color: getColor(e.level) }));
  },
});
