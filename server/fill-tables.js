import { RockInfo } from "/imports/api/rocks";
import { MineralInfo } from "/imports/api/minerals";
import { GeologicalTime } from "/imports/api/geological-time";
import { LogData } from "/imports/api/log-data/log-data";
import { Location } from "/imports/api/location/location";
import { Species } from "/imports/api/species/species";
import { Taxonomy } from "/imports/api/taxonomy.js";
import { Countries } from "/imports/api/countries.js";
import '/imports/api/location/methods.js';
import '/imports/api/log-data/methods.js';
import '/imports/api/species/methods.js';

if (Meteor.isServer) {
    Meteor.publish('location', function() {
        let currentUserId = this.userId;
        return Location.find({ createdBy: currentUserId});
    });

    Meteor.publish('species', function() {
        let currentUserId = this.userId;
        return Species.find({ createdBy: currentUserId});
    });

    Meteor.publish('taxonomy', function() {
        return Taxonomy.find({});
    });

    Meteor.publish('log-data', function() {
        let currentUserId = this.userId;
        return LogData.find({ createdBy: currentUserId});
    });

    Meteor.publish('geo-time', function() {
        return GeologicalTime.find({});
    });

    Meteor.publish('countries', function() {
        return Countries.find({});
    });
}


