import { Template } from 'meteor/templating';
import './location.html';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '/imports/api/location/methods.js';
import { formatDate } from '/imports/ui/components/util.js';
import ExifReader from 'exifreader';
import { gps } from 'exifr';

'use strict';

const locEntered = new ReactiveArray();
let currentSelected = new ReactiveVar();

if (Meteor.isClient) {
    Tracker.autorun(() => {
        Meteor.subscribe('location');
    });

    let error = new ReactiveVar(null);
    let status = new ReactiveVar(null);
    let longError = new ReactiveVar(null);
    let latError = new ReactiveVar(null);
    let areaError = new ReactiveVar(null);
    let imageError = new ReactiveVar(null);
    let currentDate = formatDate();

    Template.location.helpers({
        errorDisplay: function () {
            return error.get();
        },

        statusDisplay: function () {
            return status.get();
        },

        maxDate: function () {
            return currentDate;
        },

        locDisplay: function () {
            return locEntered.list();
        },

        lonErrorDisplay: function () {
            return longError.get();
        },

        latErrorDisplay: function () {
            return latError.get();
        },

        imageErrorDisplay: function () {
            return imageError.get();
        }
    });

    Template.editModal.helpers({
        jsonPrint(jsonObject) {
            return JSON.stringify(jsonObject);
        },

        maxDate: function () {
            return currentDate;
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

            const gpsArray = new ReactiveArray();
            let lat = new ReactiveVar();
            let long = new ReactiveVar();
            let date = currentDate;
            const files = e.target.locationImg.files;

            if (!date) {
                date = currentDate;
            }

            if (files.length > 0) {
                const reader = new FileReader();

                reader.onload = function (readerEvent) {
                    let buffer = readerEvent.target.result;
                    const tags = ExifReader.load(buffer, { expanded: true });

                    for (const group in tags) {
                        for (const name in tags[group]) {
                            if (group === 'gps') {
                                gpsArray.push(`${tags[group][name]}`);
                            }
                            else if (group === 'exif' && name === 'DateTime') {
                                let photoDate = tags['exif'].DateTime.description;
                                let res = photoDate.split(":", 3);
                                let lastDate = res[2];
                                res.pop();
                                lastDate = lastDate.split(" ");
                                res.push(lastDate[0]); 
                                date = res[0] + "-" + res[1] + "-" + res[2]; 
                                console.log(date);
                            }
                        }
                    }

                    lat = gpsArray[0];
                    long = gpsArray[1];

                    let geocoder = new google.maps.Geocoder();
                    lat = parseFloat(lat);
                    long = parseFloat(long);
                    if (!lat && !long) {
                        imageError.set("No meta data, please use a different photo.");
                    }
                    else {
                        let latlng = {
                            lat: lat,
                            lng: long
                        };

                        geocoder.geocode({ location: latlng }, (results, status) => {
                            if (status === "OK") {
                                if (results[0]) {
                                    locationReturned = results[0].formatted_address;
                                    let areaName = "";
                                    let locName = "";
                                    let countryName = "";

                                    let indice = 0;
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
                                        for (let i = 0; i < results[j].address_components.length; i++) {
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
                                            createdBy: Meteor.userId(),
                                            areaName: areaName,
                                            locName: locName,
                                            countryName: countryName,
                                            latitudeNum: lat,
                                            longitudeNum: long,
                                            visitDate: date,
                                            editDate: date,
                                            createdDate: date
                                        }

                                        locEntered.push(currentSelected);
                                        imageError.set("Uploaded Location: " + areaName);
                                    }
                                }
                            }
                            else if (status === "ZERO_RESULTS") {
                                imageError.set("No results found at those coordinates.");
                            }
                            else {
                                imageError.set("Geocoder failed due to: " + status);
                            }
                        });
                    };
                }

                reader.readAsArrayBuffer(files[0]);
            }
            else {
                imageError.set("Please choose a picture.");
            }
            e.target.reset();
        },

        'submit #locationLogForm': function (e) {
            e.preventDefault();
            let lat = e.target.latitudeNum.value;
            let long = e.target.longitudeNum.value;
            let date = e.target.date.value;

            if (!date) {
                date = currentDate;
            }

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
                    let geocoder = new google.maps.Geocoder();
                    lat = parseFloat(lat);
                    long = parseFloat(long);
                    let latlng = {
                        lat: lat,
                        lng: long
                    };

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                locationReturned = results[0].formatted_address;
                                let areaName = "";
                                let locName = "";
                                let countryName = "";

                                let indice = 0;
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
                                    for (let i = 0; i < results[j].address_components.length; i++) {
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
                                        createdBy: Meteor.userId(),
                                        areaName: areaName,
                                        locName: locName,
                                        countryName: countryName,
                                        latitudeNum: lat,
                                        longitudeNum: long,
                                        visitDate: date,
                                        editDate: date,
                                        createdDate: date
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

            let locName = document.getElementById('locName');
            locName.value = currentSelected.areaName;

            let areaName = document.getElementById('areaName');
            areaName.value = currentSelected.locName;

            let country = document.getElementById('countryName');
            country.value = currentSelected.countryName;

            let date = document.getElementById('editDate');
            date.value = currentSelected.visitDate;

        }
    });

    Template.editModal.events({
        'click .add': function (e, template) {
            let locNameHolder = document.getElementById('locName');
            let locHolder = template.find('#locName').value;
            if (!locHolder) {
                areaError.set("Please enter an area name");
            }
            else {
                currentSelected.areaName = locNameHolder.value;

                let areaNameHolder = document.getElementById('areaName');
                currentSelected.locName = areaNameHolder.value;

                let countryHolder = document.getElementById('countryName');
                currentSelected.countryName = countryHolder.value;

                let dateHolder = document.getElementById('date');
                currentSelected.visitDate = dateHolder.value;

                locEntered.push();

                Modal.hide('editModal');
            }
        },

        'click .reset': function () {
            let geocoder = new google.maps.Geocoder();
            let latlng = {
                lat: parseFloat(currentSelected.latitudeNum),
                lng: parseFloat(currentSelected.longitudeNum)
            };

            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        locationReturned = results[0].formatted_address;

                        let indice = 0;
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
                            for (let i = 0; i < results[j].address_components.length; i++) {
                                if (results[j].address_components[i].types[0] == "locality") {
                                    currentSelected.areaName = results[j].address_components[i].long_name;
                                    let locNameHolder = document.getElementById('locName');
                                    locNameHolder = currentSelected.areaName;
                                }
                                if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                                    currentSelected.locName = results[j].address_components[i].long_name;
                                    let areaNameHolder = document.getElementById('areaName');
                                    areaNameHolder = currentSelected.locName;
                                }
                                if (results[j].address_components[i].types[0] == "country") {
                                    currentSelected.countryName = results[j].address_components[i].long_name;
                                    let countryHolder = document.getElementById('countryName');
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
            let areaHolder = template.find('#areaName').value;

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