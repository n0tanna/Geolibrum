import { get } from 'jquery';
import { Template } from 'meteor/templating';
import './add.html';
import 'blueimp-load-image/js/load-image.all.min.js';

if (Meteor.isClient) {
    const logName = new ReactiveVar();
    const date = new ReactiveVar();
    const error = new ReactiveVar(null);

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

    Template.addLog.errorHelper = function () {
        return error.get();
    }

    Template.addNewEntry.logNameHelper = function () {
        return logName.get();
    }

    Template.addNewEntry.dateHelper = function () {
        return date.get();
    }

    Template.location.events({
        'submit #location-log-form': function (event) {
            event.preventDefault();
            var file = event.target.locationImageUploader.value;
            console.log("aaaa");

            var loadImage = require('blueimp-load-image-browserify/js/load-image');
            console.log(file);
            loadImage(
                file,
                function (file, data) {
                    console.log(data);
                    var gpsInfo = data.exif && data.exif.get('GPSInfo')
                    if (gpsInfo) {
                        // Map of all GPSInfo tags with their mapped names/text as keys/values:
                        console.log(gpsInfo.getAll())
                        // A specific GPSInfo tag value:
                        console.log(gpsInfo.get('GPSLatitude'))
                    }
                },
                { meta: true }
            )
        }
    });
}