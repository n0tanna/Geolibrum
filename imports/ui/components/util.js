import { Template } from 'meteor/templating';
import { Countries } from '/imports/api/countries.js';


import popper from 'popper.js'

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: Meteor.settings.public.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.public.AWSSecretAccessKey,
    region: 'us-east-1'
});

global.Popper = global.Popper || popper

Meteor.startup(function () {
    GoogleMaps.load({ key: Meteor.settings.public.googleAPI });
    Tracker.autorun(() => {
        Meteor.subscribe('countries');
    });
});

export function uploadImage(image, directory) {
    const params = {
        Bucket: Meteor.settings.public.S3Bucket,
        Key: directory,
        Body: image
    };

    s3.upload(params, function (err, data) {
        if (err) throw err;
        console.log(`File uploaded successfully at ${data.Location}`);
    });
}

export function deleteImage(imageURL) {
    const params = {
        Bucket: Meteor.settings.public.AWSAccessKeyId,
        Key: imageURL
    };

    s3.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : " + err);
        }
    });

}

export function formatDate() {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) {
        return year + '-' + month + '-' + '0' + day;
    }
    else if (month < 10) {
        return year + '-' + '0' + month + '-' + day;
    }
    else if (day < 10 && month < 10) {
        return year + '-' + '0' + month + '-' + '0' + day;
    }
    else {
        return year + '-' + month + '-' + day;
    }
}

export function loadMap(list, locations) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 1,
        center: { lat: 0, lng: 0 }
    });

    let fullName = "";
    list.forEach(function (element) {
        let fullLoc = "";
        if (element.city === "") {
            fullLoc = element.region + ", " + element.country;
            fullName = fullLoc;
        }
        else if (element.region == "") {
            fullLoc = element.country;
            fullName = fullLoc;
        }
        else {
            fullLoc = element.city + ", " + element.region + ", " + element.country;
            fullName = fullLoc;
        }

        locations.push(fullName);
        fullName = "";

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': fullLoc }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let cor = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                let marker = new google.maps.Marker({
                    position: cor,
                    map: map
                });
            }
            else {
                console.log("Something went wrong " + status);
            }
        });
    });
}

export function loadCountries(locHolder) {
    let tempHolderStart = Countries.find().fetch();
    let tempHolderCont = new Array();

    tempHolderStart.forEach(element => tempHolderCont.push(element.Countries));

    tempHolderCont.forEach(function (contValue) {
        contValue.forEach(function (country) {
            locHolder.push(country);
        });
    });
}

export function loadStates(locHolder, chosenCountry, stateHolder) {
    locHolder.forEach(function (values) {
        if (values.CountryName === chosenCountry) {
            let tempHolder = values.States;
            stateHolder.clear();
            tempHolder.forEach(function (innerValues) {
                stateHolder.push(innerValues);
            });
        }
    });
}

export function loadCities(stateHolder, chosenState, cityHolder) {
    stateHolder.forEach(function (values) {
        if (values.StateName === chosenState) {
            let tempHolder = values.Cities;
            cityHolder.clear();
            console.log(tempHolder);
            tempHolder.forEach(function (innerValues) {
                cityHolder.push(innerValues);
            });
        }
    });
}