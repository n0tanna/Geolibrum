import { Mongo } from 'meteor/mongo';

const dm = new Mongo.Collection('domains');

export { dm as Domains }