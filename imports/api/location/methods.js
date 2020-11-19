import { Mongo } from 'meteor/mongo';
import { Location } from "./location";

Meteor.methods({
    addLocation: function (locEntered) {
        console.log(locEntered.areaName);
        Location.insert({
            location_area: locEntered.areaName,
            location_region: locEntered.locName,
            location_country: locEntered.countryName,
            lat: locEntered.latitudeNum,
            long: locEntered.longitudeNum
        });
    }
});