import './speciesList.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';
import '/imports/ui/components/util.js';
import { deleteImage, loadCountries, loadMap, loadTime } from '../util.js';
import { loadStates } from '../util.js';
import { loadCities } from '../util.js';

let updateMessage = new ReactiveVar();
let home = new ReactiveVar(true);
let view = new ReactiveVar();

let times = new ReactiveArray();
let locations = new ReactiveArray();
let images = new ReactiveArray();

let chosenCountry = "";
let chosenState = "";
let chosenCity = "";
let chosenEon = "";
let chosenEra = "";
let chosenTime = "";

let locHolder = new ReactiveArray();
let eonHolder = new ReactiveArray();
let eraHolder = new ReactiveArray();
let timeHolder = new ReactiveArray();
let stateHolder = new ReactiveArray();
let cityHolder = new ReactiveArray();

let specId = new ReactiveArray();

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
        countryDrop: function () {
            return locHolder.list();
        },

        stateDrop: function () {
            return stateHolder.list();
        },

        cityDrop: function () {
            return cityHolder.list();
        },

        eonDrop: function () {
            return eonHolder.list();
        },

        eraDrop: function () {
            return eraHolder.list();
        },

        timeDrop: function () {
            return timeHolder.list();
        },

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
        loadTime(eonHolder, "", "", "");
        loadCountries(locHolder);
        console.log(eonHolder);    
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
            specId = this._id;
            Modal.show('updateModal');
        }
    });

    Template.updateModal.events({
        "change #country": function (event, template) {
            chosenCountry = template.$("#country").val();
            loadStates(locHolder, chosenCountry, stateHolder);
        },

        "change #region": function (event, template) {
            chosenState = template.$("#region").val();
            loadCities(stateHolder, chosenState, cityHolder);
            
        },

        "change #city": function (event, template) {
            chosenCity = template.$("#city").val();
        },

        "change #eon": function (event, template) {
            eraHolder.clear();
            chosenEon = template.$("#eon").val();
            loadTime(eonHolder, "eon", chosenEon, "eras", eraHolder);
        },

        "change #era": function (event, template) {
            timeHolder.clear();
            chosenEra = template.$("#era").val();
            loadTime(eraHolder, "era", chosenEra, "time_periods", timeHolder);    
        },

        "change #timePeriod": function (event, template) {
            chosenTime = template.$("#timePeriod").val();
        },

        'click .deleteImg': function () {
            console.log(this);
            images.remove(this);
        },

        'click .addTime': function () {
            let time = {
                eon: chosenEon,
                era: chosenEra,
                time: chosenTime
            }

            chosenEon = "";
            chosenEra = "";
            chosenTime = "";

            timeHolder.clear();
            eraHolder.clear();
            times.push(time);
        },

        'click .addLocation': function () {
            let location = chosenCity + ", " + chosenState + ", " + chosenCountry;

            country = "";
            region = "";
            city = "";

            stateHolder.clear();
            cityHolder.clear();

            locations.push(location);
            console.log(locations);
        },

        'click .deleteLoc': function () {
            let name = this.toString();
            locations.remove(name);
        },  

        'click .deleteTime': function () {
            times.remove(this);         
        },

        'click .update': function () {
            let updated = {
                id: specId,
                species: document.getElementById('speciesName').value,
                images: images,
                description: document.getElementById('description').value,
                date_range: times,
                locations: locations
            }

            console.log(updated);
        }
    });
}