import './locationList.html';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '/imports/api/location/methods.js';

const status = new ReactiveVar("No locations.");
var locations = new ReactiveArray();
var locId = new ReactiveVar();
var currentLoc = new ReactiveVar();

if (Meteor.isClient) {
    Template.locationList.helpers({
        statusDisplay: function () {
            return status.get();
        },
        displayLocation: function () {
            return locations.list();
        }
    });

    Template.locationList.onCreated(function () {
        Meteor.call("getCount", function (error, result) {
            if (error) {
                console.log("Error: " + error.reason)
            } else {
                console.log(result);
                if (result > 0) {
                    status.set(null);
                    Meteor.call("getLocations", function (error, result) {
                        if (error) {
                            console.log("Error: " + error.reason)
                        } 
                        else {
                            for (var i = 0; i < result.length; i++) {
                                locations.push(result[i]);
                            }
                        }
                    });
                }
            }
        });
    });

    Template.locationList.events({
        'click .remove': function () {
            Modal.show('warningModal');
            locId = this._id;
        },

        'click .edit': function () {
            Modal.show('editLocModal');
            locId = this.id;
            currentLoc = this;

            var locName = document.getElementById('locName');
            locName.value = this.location_area;

            var areaName = document.getElementById('areaName');
            areaName.value = this.location_region;

            var country = document.getElementById('countryName');
            country.value = this.location_country;

            var lat = document.getElementById('lat');
            lat.value = this.lat;

            var long = document.getElementById('long');
            long.value = this.long;
        },

        'click .clearAll': function () {
            Modal.show('deleteAllModal');
        },

        'click .addLocation': function () {
            Router.go('location');
        }
    });
    
    Template.warningModal.events({
        'click .delete': function () {
            Meteor.call("deleteLocation", locId, function (error) {
                if (error) {
                    console.log("Error: " + error.reason)
                } 
                else {
                    status.set("Deleted!");
                    locations.push();
                }
            });
        }
    });

    Template.editLocModal.events({
        'click .save': function () {
            
        },

        'click .search': function () {
            
        }
    });

    Template.deleteAllModal.events({
        'click .deleteAll': function () {  
            for (var i = 0; i < locations.length; i++) {
                locId = locations[i]._id;
                Meteor.call("deleteLocation", locId, function (error) {
                    if (error) {
                        console.log("Error: " + error.reason)
                    } 
                    else {
                        locations.pop(i);
                        status.set("Locations cleared!");
                    }
                });
            }
        }
    });
}