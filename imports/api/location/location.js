import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const l = new Mongo.Collection('location');

l.schema = new SimpleSchema ({
    location_area: {type: String},
    location_region: {type: String},
    location_country: {type: String},
    lat: {type: String},
    long: {type: String},
    date_created: {type: Date, defaultValue: new Date()}
    
});

export { l as Location }