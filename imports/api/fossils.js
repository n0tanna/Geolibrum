import { Mongo } from 'meteor/mongo';

const f = new Mongo.Collection('fossils');

export { f as Fossils }