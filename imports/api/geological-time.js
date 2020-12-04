import { Mongo } from 'meteor/mongo';

const gt = new Mongo.Collection('geological_time');

export { gt as GeologicalTime }