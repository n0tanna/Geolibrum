import './speciesList.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';

Template.speciesList.helpers({
    displaySpecies: () => {
        return Species.find({});
    }
});

Template.speciesList.events({
    'click .addSpecies': function () {
        Router.go('species');
    },

    'click .remove': function () {

    }
});