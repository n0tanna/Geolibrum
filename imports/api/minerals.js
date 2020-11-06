import { Mongo } from 'meteor/mongo';

const m = new Mongo.Collection('minerals');

export { m as Minerals }