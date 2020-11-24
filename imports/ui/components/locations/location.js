import { Template } from 'meteor/templating';
import './location.html';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '/imports/api/location/methods.js';
import '/imports/ui/components/util.js';
import ExifReader from 'exifreader';

var locEntered = new ReactiveArray();
var currentSelected = new ReactiveVar();

if (Meteor.isClient) {
    var error = new ReactiveVar(null);
    var status = new ReactiveVar(null);
    var longError = new ReactiveVar(null);
    var latError = new ReactiveVar(null);
    var areaError = new ReactiveVar(null);

    Template.location.helpers({
        errorDisplay: function () {
            return error.get();
        },

        statusDisplay: function () {
            return status.get();
        },

        locDisplay: function () {
            return locEntered.list();
        },

        lonErrorDisplay: function () {
            return longError.get();
        },

        latErrorDisplay: function () {
            return latError.get();
        }
    });

    Template.editModal.helpers({
        jsonPrint(jsonObject) {
            return JSON.stringify(jsonObject);
        },

        editErrorDisplay: function () {
            return areaError.get();
        }
    });

    Template.areaModal.helpers({
        areaErrorDisplay: function () {
            return areaError.get();
        }
    });

    Template.location.events({
        'submit #imageSearch': function (e) {
            e.preventDefault();
        
            const files = e.target.locationImg.files;
            const reader = new FileReader();
            console.log(files);
       
        
            reader.onload = function (readerEvent) {
                try {
                    var buffer = readerEvent.target.result;
                    const tags = ExifReader.load(buffer, {expanded: true});
                    console.log(tags);
                   
                } 
                catch (error) {
        
                }
            };
            reader.readAsArrayBuffer(files[0]);
        },

        'submit #locationLogForm': function (e) {
            e.preventDefault();
            var lat = e.target.latitudeNum.value;
            var long = e.target.longitudeNum.value;

            if (!lat && !long) {
                error.set("Please enter a latitude and a longitude.");
            }
            else if (!lat || !long) {
                if (!lat) {
                    latError.set("Please enter a latitude.");
                }
                else {
                    longError.set("Please enter a longitude.");
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
                                    else if (results[j].types[0] == 'administrative_area_level_1') {
                                        indice = j;
                                        break;
                                    }
                                    else if (results[j].types[0] == 'country') {
                                        indice = j;
                                        break;
                                    }
                                }

                                if (results.address_components != 0) {
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

                                    if (areaName == '') {
                                        Modal.show('areaModal');
                                    }

                                    currentSelected = {
                                        areaName: areaName,
                                        locName: locName,
                                        countryName: countryName,
                                        latitudeNum: lat,
                                        longitudeNum: long
                                    }

                                    locEntered.push(currentSelected);
                                    error.set(null);
                                    longError.set(null);
                                    latError.set(null);
                                }
                                else {
                                    error.set("No information at those coordinates.");
                                }
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
                    error.set("Please enter a number for GPS coordinates.");
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
            if (locEntered.length == 0) {
                status.set("Please add a location.");
            }
            else {
                locEntered.forEach(function (holder, index) {
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
        'click .add': function (e, template) {
            var locNameHolder = document.getElementById('locName');
            var locHolder = template.find('#locName').value;
            if (!locHolder) {
                areaError.set("Please enter an area name");
            }
            else {
                currentSelected.areaName = locNameHolder.value;

                var areaNameHolder = document.getElementById('areaName');
                currentSelected.locName = areaNameHolder.value;

                var countryHolder = document.getElementById('countryName');
                currentSelected.countryName = countryHolder.value;

                locEntered.push();

                Modal.hide('editModal');
            }
        },

        'click .reset': function () {
            var geocoder = new google.maps.Geocoder();
            var latlng = {
                lat: parseFloat(currentSelected.latitudeNum),
                lng: parseFloat(currentSelected.longitudeNum)
            };

            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        locationReturned = results[0].formatted_address;

                        var indice = 0;
                        for (var j = 0; j < results.length; j++) {
                            if (results[j].types[0] == 'locality') {
                                indice = j;
                                break;
                            }
                            else if (results[j].types[0] == 'administrative_area_level_1') {
                                indice = j;
                                break;
                            }
                            else if (results[j].types[0] == 'country') {
                                indice = j;
                                break;
                            }
                        }

                        if (results.address_components != 0) {
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
                }
                locEntered.push();
            });

        }
    });

    Template.areaModal.events({
        'click .save': function (e, template) {
            var areaHolder = template.find('#areaName').value;

            if (!areaHolder) {
                areaError.set("Please enter an area name.");
            }
            else {
                Modal.hide('areaModal');
                currentSelected.areaName = areaHolder;
                locEntered.push();
                areaError.set(null);
            }
        }
    });
}