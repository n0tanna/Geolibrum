import { Mongo } from 'meteor/mongo';

const cl = new Mongo.Collection('classess');

cl.schema = new SimpleSchema ({
    phylum: {type: String},
    class: {type: String},
    description: {type: String},
    subclass: {type: String, optional: true},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { cl as Classes }