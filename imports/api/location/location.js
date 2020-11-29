import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const l = new Mongo.Collection('location');

l.schema = new SimpleSchema ({
    location_area: {type: String},
    location_region: {type: String},
    location_country: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_visited: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},
    lat: {type: String},
    long: {type: String},
    
});

export { l as Location }