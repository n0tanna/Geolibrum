import { Template } from 'meteor/templating';
import './location.html';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '/imports/api/location/methods.js'
import '/imports/ui/components/util.js';

var locEntered = new ReactiveArray();
var currentSelected = new ReactiveVar();

if (Meteor.isClient) {
    var error = new ReactiveVar(null);
    var status = new ReactiveVar(null);

    Template.location.helpers({
        errorDisplay: function () {
            return error.get();
        },

        statusDisplay: function () {
            return status.get();
        },

        locDisplay: function () {
            return locEntered.list();
        }
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

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                locationReturned = results[0].formatted_address;
                                var areaName = "";
                                var locName = "";
                                var countryName = "";

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
                            error.set("Geocoder failed due to: " + status);
                        }
                        
                    });
                }
                else {
                    error.set("Please enter a number.");
                }
                status.set(null);
            }
            e.target.reset();
        },

        'click .clear': function () {
            locEntered.length = 0;
            locEntered.push();
        },

        'click .add': function () {

            if(locEntered.length == 0) {
                status.set("Please add a location.");
            }
            else {
                console.log(locEntered);
                locEntered.forEach(function (holder, index){
                    Meteor.call('addLocation', holder);
                });
    
                locEntered.length = 0;
                locEntered.push();
                status.set("Added successfully.");
            }

        },

        'click .locations': function () {
            Router.go('locationList');
        },

        'click .remove': function () {
            return locEntered.remove(this);
        },

        'click .edit': function () {
            currentSelected = this;

            Modal.show('editModal');

            var locName = document.getElementById('locName');
            locName.value = currentSelected.areaName;

            var areaName = document.getElementById('areaName');
            areaName.value = currentSelected.locName;

            var country = document.getElementById('countryName');
            country.value = currentSelected.countryName;

        }
    });

    Template.editModal.events({
        'click .add': function (e) {
            var locNameHolder = document.getElementById('locName');
            currentSelected.areaName = locNameHolder.value;

            var areaNameHolder = document.getElementById('areaName');
            currentSelected.locName = areaNameHolder.value;

            var countryHolder = document.getElementById('countryName');
            currentSelected.countryName = countryHolder.value;
            locEntered.push();
        },

        'click .reset': function () {
            var geocoder = new google.maps.Geocoder();
            console.log(currentSelected);
            var latlng = {
                lat: parseFloat(currentSelected.latitudeNum),
                lng: parseFloat(currentSelected.longitudeNum)
            };

            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        locationReturned = results[0].formatted_address;
                        console.log(results[0]);

                        var indice = 0;
                        for (var j = 0; j < results.length; j++) {
                            if (results[j].types[0] == 'locality') {
                                indice = j;
                                break;
                            }
                        }

                        for (var i = 0; i < results[j].address_components.length; i++) {
                            if (results[j].address_components[i].types[0] == "locality") {
                                currentSelected.areaName = results[j].address_components[i].long_name;
                                var locNameHolder = document.getElementById('locName');
                                locNameHolder = currentSelected.areaName;
                            }
                            if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                                currentSelected.locName = results[j].address_components[i].long_name;
                                var areaNameHolder = document.getElementById('areaName');
                                areaNameHolder = currentSelected.locName;
                            }
                            if (results[j].address_components[i].types[0] == "country") {
                                currentSelected.countryName = results[j].address_components[i].long_name;
                                var countryHolder = document.getElementById('countryName');
                                countryHolder = currentSelected.countryName;
                            }
                        }
                    }
                }

                locEntered.push();
            });

        }
    });
}