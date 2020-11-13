import { Template } from 'meteor/templating';
import './location.html';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import popper from 'popper.js'

global.Popper = global.Popper || popper

var locEntered = new ReactiveArray();

Meteor.startup(function () {
    GoogleMaps.load({ key: '' });

});

if (Meteor.isClient) {
    const error = new ReactiveVar(null);

    Template.location.helpers({
        errorDisplay: function () {
            return error.get();
        },

        locDisplay: function () {
            return locEntered.list();
        },
    });

    Template.editModal.helpers({
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
                    var geocoder = new google.maps.Geocoder();
                    lat = parseFloat(lat);
                    long = parseFloat(long);
                    var latlng = {
                        lat: lat,
                        lng: long
                    };
                    var locationReturned = "";

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                locationReturned = results[0].formatted_address;
                                console.log(results[0]);
                                var areaName = "";
                                var locName = "";
                                var countryName = "";

                                var indice =  0;
                                for (var j = 0; j < results.length; j++) {
                                    if (results[j].types[0] == 'locality') {
                                        indice = j;
                                        break;
                                    }
                                }

                                for (var i = 0; i < results[j].address_components.length; i++) {
                                    if (results[j].address_components[i].types[0] == "locality") {
                                        areaName = results[j].address_components[i].long_name;
                                    }
                                    if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                                        locName = results[j].address_components[i].long_name;
                                    }
                                    if (results[j].address_components[i].types[0] == "country") {
                                        countryName = results[j].address_components[i].long_name;
                                    }
                                }
                                var locationData = {
                                    areaName: areaName,
                                    locName: locName,
                                    countryName: countryName,
                                    latitudeNum: lat,
                                    longitudeNum: long
                                }

                                locEntered.push(locationData);
                                error.set(null);
                            }
                        }
                        else if (status === "ZERO_RESULTS") {
                            error.set("No results found at those coordinates.");
                        }
                        else {
                            window.alert("Geocoder failed due to: " + status);
                        }
                    });
                }
                else {
                    error.set("Please enter a number.");
                }
            }
        },

        'click .remove': function () {
            return locEntered.remove(this);
        },

        'click .edit': function () {
            Modal.show('editModal')
            console.log(this);
        }
    });
}