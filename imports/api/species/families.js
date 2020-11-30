import { Mongo } from 'meteor/mongo';

const fa = new Mongo.Collection('families');

fa.schema = new SimpleSchema ({
    order: {type: String},
    family: {type: String},
    description: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { fa as Families }