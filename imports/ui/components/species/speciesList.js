import './speciesList.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';
import { deleteImage, loadMap } from '../util.js';

let updateMessage = new ReactiveVar();
let home = new ReactiveVar(true);
let view = new ReactiveVar();

let times = new ReactiveArray();
let locations = new ReactiveArray();
let images = new ReactiveArray();

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
        },

        locationDisplay: function () {
            return locations.list();
        },

        imageDisplay: function () {
            return images.list();
        },

        timeDisplay: function () {
            return times.list();
        },

        obj: function () {
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
        locations.clear();
        let loc = speciesObj.locations;
        loadMap(loc, locations);        
    });

    Template.view.events({
        'click .return': function () {
            home.set(true);
            view.set("");
            images.clear();
            times.clear();
            locations.clear();
        },

        'click .update': function () {
            Modal.show('updateModal');
        }
    });

    Template.updateModal.events({
        'click .deleteImg': function () {
            images.remove(this);
        },

        'click .deleteLoc': function () {
            locations.remove(this);
        },

        'click .deleteTime': function () {
            times.remove(this);
        }
    });
}