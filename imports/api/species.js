import { Mongo } from 'meteor/mongo';

const sp = new Mongo.Collection('species');

export { sp as Species }