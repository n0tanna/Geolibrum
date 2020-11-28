import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ld = new Mongo.Collection('log_data');

ld.schema = new SimpleSchema ({
    log_name: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_found: {type: Date, defaultValue: new Date()},
    location: {type: Array, optional: true},
    'location.$': Object,
    entries: {type: Array},
    'entries.$': Object
});

export { ld as LogData }