import { Mongo } from 'meteor/mongo';
import { Location } from "./location";

Meteor.methods({
    addLocation: function (locEntered) {
        Location.insert({
            createdBy: locEntered.createdBy,
            location_area: locEntered.areaName,
            location_region: locEntered.locName,
            location_country: locEntered.countryName,
            date_created: locEntered.createdDate,
            date_edited: locEntered.editDate,
            date_visited: locEntered.visitDate,
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

    updateLocFunction: function (id, area, region, country, lat, long, editDate, date) {
        Location.update({_id: id}, {$set:{location_area: area, location_region: region, location_country: country, lat: lat, long: long, date_visited: date, edit_date: editDate}});
    }
});