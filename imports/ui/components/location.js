import { Template } from 'meteor/templating';
import './location.html';


var locEntered = new ReactiveArray();

if (Meteor.isClient) {
    const error = new ReactiveVar(null);

    Template.location.helpers({
        errorDisplay: function () {
            return error.get();
        },

        locDisplay: function () {
            return locEntered.list();
        },

        jsonPrint(jsonObject) {
            return JSON.stringify(jsonObject);
        }
    });

    Template.location.events({
        'submit #locationLogForm': function (e) {
            e.preventDefault();

            //Will get this to work later
            /*var file = event.target.locationImageUploader.value;
            
            (async () => {
                let {latitude, longitude} = await exifr.gps(file);
                console.log(latitude);
            })();*/
            var name = e.target.locationName.value;
            var lat = e.target.latitudeNum.value;
            var long = e.target.longitudeNum.value;

            if (!lat && !long) {
                error.set("Please enter a latitude and a longitude.");

            }
            else if (!lat || !long) {
                if (!lat) {
                    error.set("Please enter a latitude.");
                }
                else {
                    error.set("Please enter a longitude.");
                }
            }
            else {
                if (!isNaN(lat) && !isNaN(long)) {
                    lat = parseFloat(lat);
                    long = parseFloat(long);

                    var locationData = {
                        areaName: name,
                        latitudeNum: lat,
                        longitudeNum: long
                    }

                    locEntered.push(locationData);
                    error.set(null);
                }
                else {
                    error.set("Please enter a number.");
                }
            }
        },

        'click .remove': function() {
            return locEntered.remove(this);
        },

        'click .edit': function() {
            console.log(this);
        }
    });

}