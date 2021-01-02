import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const sp = new Mongo.Collection('species');

export { sp as Species }