import './speciesList.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';
import '/imports/ui/components/util.js';

let updateMessage = new ReactiveVar();
let home = new ReactiveVar(true);
let view = new ReactiveVar();

let times = new ReactiveArray();
let locations = new ReactiveArray();
let images = new ReactiveArray();
let gps = new ReactiveArray();

import { deleteImage } from '../util.js';

let speciesObj = '';

if (Meteor.isClient) {

    Tracker.autorun(() => {
        Meteor.subscribe('species');
    });

    Template.speciesList.helpers({
        speciesHome: function () {
            return home.get();
        },

        viewPage: function () {
            return view.get();
        }
    });

    Template.speciesDisplay.helpers({
        displaySpecies: () => {
            return Species.find({});
        },

        displayMessage: function () {
            return updateMessage.get();
        }
    });

    Template.view.helpers({
        speciesValue: function () {
            return speciesObj;
        },

        locationDisplay: function () {
            return locations.list();
        },

        imageDisplay: function () {
            return images.list();
        },

        timeDisplay: function () {
            return times.list();
        }
    });

    Template.updateModal.helpers({
        speciesValue: function () {
            return speciesObj;
        }
    });

    Template.speciesDisplay.events({
        'click .addSpecies': function () {
            Router.go('species');
        },

        'click .view': function () {
            home.set("");
            view.set(true);
            speciesObj = this;
            let time = speciesObj.date_range;
            let img = speciesObj.images;

            time.forEach(function (element) {
                times.push(element);
            });

            img.forEach(function (element) {
                images.push(element);
                console.log(element);
            });
        },

        'click .delete': function () {
            speciesObj = this;
            let img = speciesObj.images;
            img.forEach(function (element) {
                console.log(element.name);
                deleteImage(element.name);
            });

            Meteor.call('deleteSpecies', this._id);
            updateMessage.set("Deleted " + this.species);

        }
    });

    Template.view.onRendered(function () {
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 1,
            center: { lat: 0, lng: 0 }
        });

        let loc = speciesObj.locations;
        let fullName = "";

        console.log(loc);

        loc.forEach(function (element) {
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
            geocoder.geocode( { 'address': fullLoc}, function(results, status) {
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
    });

    Template.view.events({
        'click .return': function () {
            home.set(true);
            view.set("");
        },

        'click .update': function () {
            Modal.show('updateModal');
        }
    });
}