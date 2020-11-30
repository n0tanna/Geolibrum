import { Mongo } from 'meteor/mongo';

const ge = new Mongo.Collection('genus');

ge.schema = new SimpleSchema ({
    family: {type: String},
    genus: {type: String},
    description: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { ge as Genus }