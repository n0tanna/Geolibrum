import { Mongo } from 'meteor/mongo';

const ri = new Mongo.Collection('rock_info');

export { ri as RockInfo }