import './locationList.html';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '/imports/api/location/methods.js';
import '/imports/ui/components/util.js';
import { Location } from '../../../api/location/location';

var status = new ReactiveVar("No locations.");
var locations = new ReactiveArray();
var locId = new ReactiveVar();
var searchError = new ReactiveVar();

if (Meteor.isClient) {
    Template.locationList.helpers({
        statusDisplay: function () {
            return status.get();
        },
        displayLocation: () => {
            return Location.find({});
       }
    });

    Template.editLocModal.helpers({
        searchError: function () {
            return searchError.get();
        }
    });

    Template.locationList.onRendered(function () {
        locations.length = 0;
        Meteor.call("getCount", function (error, result) {
            if (error) {
                console.log("Error: " + error.reason)
            } else {
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
                }
            });
        }
    });

    Template.editLocModal.events({
        'click .save': function () {
            
        },

        'click .search': function (e, template) {
            var lat = template.find('#lat').value;
            var long = template.find('#long').value;
            var geocoder = new google.maps.Geocoder();
                    lat = parseFloat(lat);
                    long = parseFloat(long);
                    var latlng = {
                        lat: lat,
                        lng: long
                    };
    
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        locationReturned = results[0].formatted_address;
                        var areaName = document.getElementById('locName');
                        var locName = document.getElementById('areaName');
                        var countryName = document.getElementById('countryName');
                        var latInfo = document.getElementById('lat');
                        var longInfo = document.getElementById('long');

                        latInfo.value = lat;
                        longInfo.value = long;

                        var indice = 0;
                        for (var j = 0; j < results.length; j++) {
                            if (results[j].types[0] == 'locality') {
                                indice = j;
                                break;
                            }
                            else if (results[j].types[0] == 'administrative_area_level_1')  {
                                indice = j;
                                break;
                            }
                            else if (results[j].types[0] == 'country') {
                                indice = j;
                                break;
                            }
                        }

                        for (var i = 0; i < results[j].address_components.length; i++) {
                            if (results[j].address_components[i].types[0] == "locality") {
                                areaName.value = results[j].address_components[i].long_name;
                            }
                            if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                                locName.value = results[j].address_components[i].long_name;
                            }
                            if (results[j].address_components[i].types[0] == "country") {
                                countryName.value = results[j].address_components[i].long_name;
                            }
                        }
                    }
                }
                else if (status === "ZERO_RESULTS") {
                    searchError.set("No results found at those coordinates.");
                }
                else {
                    searchError.set("Geocoder failed due to: " + status);
                }
                
            });
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