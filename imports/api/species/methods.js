import { Mongo } from 'meteor/mongo';
import { Species } from "./species";

Meteor.methods({
    addSpecies: function (newSp) {
        Species.insert({
            createdBy: newSp.createdBy,
            domain: newSp.domain,
            kingdom: newSp.kingdom,
            phylum: newSp.phylum,
            order: newSp.order,
            family: newSp.family,
            genus: newSp.genus,
            species: newSp.species,
            images: newSp.images,
            extinct: newSp.extinct,
            description: newSp.description,
            date_range: newSp.date_range
        });
    },

    deleteSpecies: function(_id) {
        Species.remove(_id);
    },
});