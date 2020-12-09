import { Template } from 'meteor/templating';
import './add.html';
import { formatDate } from '/imports/ui/components/util.js';
import { Location } from '../../../api/location/location';
import '/imports/api/log-data/methods.js';

if (Meteor.isClient) {
    let logName = new ReactiveVar();
    let date = new ReactiveVar();
    let location = new ReactiveVar();
    let error = new ReactiveVar(null);

    let currentDate = formatDate();

    Template.addLog.helpers({
        displayLocation: () => {
            return Location.find({});
        },
        
        errorDisplay: function () {
            return error.get();
        },

        maxValue: function () {
            return currentDate;
        }
    });
        
    Template.addNewEntry.helpers({
        nameDisplay: function () {
            return logName.get();
        },

        locationDisplay: function () {
            return location.get();
        },

        dateDisplay: function () {
            return date.get();
        }
    }); 

    Template.addLog.events({
        'submit #add-log-form': function (event) {
            event.preventDefault();
            let logNameData = event.target.logName.value;
            let dateData = event.target.date.value;
            let locationData = event.target.locations.value;

            console.log(currentDate);

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
                location.set(locationData);

                Router.go('addNewEntry');
            }
        }
    });
}