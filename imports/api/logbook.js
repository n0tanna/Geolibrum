import { Mongo } from 'meteor/mongo';

const lb = new Mongo.Collection('log_book');

export { lb as LogBook }