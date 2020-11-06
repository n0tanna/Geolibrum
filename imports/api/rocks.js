import { Mongo } from 'meteor/mongo';

const r = new Mongo.Collection('rocks');

export { r as Rocks }