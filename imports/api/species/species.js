import { Mongo } from 'meteor/mongo';

const sp = new Mongo.Collection('species');

sp.schema = new SimpleSchema ({
    genus: {type: String},
    species: {type: String},
    date_range: {type: String},
    description: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { sp as Species }