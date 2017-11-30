import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const fooStub = {
  name: 'Foo',
  validate: new SimpleSchema({
    bar: { type: String },
    foobar: { type: Number },
  }).validator(),
};
