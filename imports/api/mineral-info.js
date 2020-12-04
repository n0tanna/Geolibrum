import { Mongo } from 'meteor/mongo';

const mi = new Mongo.Collection('mineral_info');

export { mi as MineralInfo }