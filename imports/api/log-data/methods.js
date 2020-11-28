import { Mongo } from 'meteor/mongo';
import { LogData } from "./log-data";
Meteor.methods({
    addLogData: function (logEntered) {
        LogData.insert({
            log_name: logEntered.logName,
            date_found: logName.date,
            date_created: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            location: logEntered.location,
            entries: logEntered.entries
        });
    },
    getLogCount: function () {
        return LogData.find().count();
    },

    getLogData: function () {
        return LogData.find().fetch();
    },

    deleteLogData: function(_id) {
        LogData.remove(_id);
    }
});