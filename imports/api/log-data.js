import { Mongo } from 'meteor/mongo';

const ld = new Mongo.Collection('log_data');

export { ld as LogData }