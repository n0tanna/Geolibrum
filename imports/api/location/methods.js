import { Mongo } from 'meteor/mongo';
import { Location } from "./location";

Meteor.methods({
    addLocation: function (locEntered) {
        Location.insert({
            location_area: locEntered.areaName,
            location_region: locEntered.locName,
            location_country: locEntered.countryName,
            lat: locEntered.latitudeNum,
            long: locEntered.longitudeNum
        });
    },
    getCount: function () {
        return Location.find().count();
    },

    getLocations: function () {
        return Location.find().fetch();
    },

    deleteLocation: function(_id) {
        Location.remove(_id);
    },

    updateLocFunction: function (id, area, region, country, lat, long) {
        Location.update({_id: id}, {$set:{location_area: area, location_region: region, location_country: country, lat: lat, long: long}});
    }
});