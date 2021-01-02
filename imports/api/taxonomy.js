import { Mongo } from 'meteor/mongo';

const ta = new Mongo.Collection('taxonomy');

export { ta as Taxonomy }