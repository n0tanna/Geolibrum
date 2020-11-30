import { Mongo } from 'meteor/mongo';

const ord = new Mongo.Collection('orders');

ord.schema = new SimpleSchema ({
    class: {type: String},
    order: {type: String},
    description: {type: String},
    date_created: {type: Date, defaultValue: new Date()},
    date_edited: {type: Date, defaultValue: new Date()},   
});

export { ord as Orders }