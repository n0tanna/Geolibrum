import { Mongo } from 'meteor/mongo';
import { Species } from "./species";

Meteor.methods({
    addLogData: function (logEntered) {
        Species.insert({
            log_name: logEntered.logName,
            date_found: logName.date,
            date_created: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            location: logEntered.location,
            entries: logEntered.entries
        });
    }
});