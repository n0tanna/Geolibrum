import { Mongo } from 'meteor/mongo';

const kn = new Mongo.Collection('kingdoms');

export { kn as Kingdoms }