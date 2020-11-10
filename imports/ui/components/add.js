import { Template } from 'meteor/templating';
import './add.html';

var logName;
var date;

if (Meteor.isClient) {
    Template.addLog.events({
        'submit #add-log-form': function (event) {
            event.preventDefault();
            logName = event.target.logName.value;
            date = event.target.date.value;
            console.log("Done");
            Router.go['addNewEntry']
        }
    });
}