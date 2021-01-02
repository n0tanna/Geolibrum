import { Mongo } from 'meteor/mongo';

const sp = new Mongo.Collection('species');

sp.schema = new SimpleSchema ({
    domain: {type: String},
    kingdom: {type: String},
    phylum: {type: String},
    order: {type: String},
    family: {type: String},
    genus: {type: String},
    species: {type: String},
    "images.$": {
        type: String
    },
    extinct: {type: String},
    date_range: {type: String},
    description: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { sp as Species }