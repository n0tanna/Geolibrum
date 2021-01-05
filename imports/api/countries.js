import { Mongo } from 'meteor/mongo';

const c = new Mongo.Collection('country');

export { c as Countries }