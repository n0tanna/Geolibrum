import { Template } from 'meteor/templating';
import './add.html';
import { Location } from '../../api/location/location';

if (Meteor.isClient) {
    const logName = new ReactiveVar();
    const date = new ReactiveVar();
    const error = new ReactiveVar(null);

    Template.addLog.helpers({
        displayLocation: () => {
            return Location.find({});
        },

        errorDisplay: function () {
            return error.get();
        }
    });

    Template.addNewEntry.helpers({
        nameDisplay: function () {
            return logName.get();
        },

        dateDisplay: function () {
            return date.get();
        }
    }); 

    Template.addLog.events({
        'submit #add-log-form': function (event) {
            event.preventDefault();
            var logNameData = event.target.logName.value;
            var dateData = event.target.date.value;

            if (!dateData && !logNameData) {
                error.set("Please enter a log name and date.");
            }
            else if (!dateData || !logNameData) {
                if (!dateData) {
                    error.set("Please enter a date.");
                }
                else {
                    error.set("Please enter a log name.");
                }
            }
            else {
                logName.set(logNameData);
                date.set(dateData);

                Router.go('addNewEntry');
            }
        }
    });
}