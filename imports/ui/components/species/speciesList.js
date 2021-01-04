import './speciesList.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';

let updateMessage = new ReactiveVar();
let home = new ReactiveVar(true);
let view = new ReactiveVar();

let locations = new ReactiveArray();
let images = new ReactiveArray();

let speciesObj = '';

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
        let locs = speciesObj.date_range;
        let img = speciesObj.images;

        locs.forEach(function (element){
            locations.push(element);
        });

        img.forEach(function (element){
            images.push(element);
            console.log(element);
        });
    },

    'click .delete': function () {
        Meteor.call('deleteSpecies', this._id);
        updateMessage.set("Deleted " + this.species);
    }
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