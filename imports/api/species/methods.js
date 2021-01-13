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
            class: newSp.class,
            family: newSp.family,
            genus: newSp.genus,
            species: newSp.species,
            images: newSp.images,
            extinct: newSp.extinct,
            description: newSp.description,
            date_range: newSp.date_range,
            count: newSp.count,
            locations: newSp.locations

        });
    },

    deleteSpecies: function(_id) {
        Species.remove(_id);
    },

    updateSpecies: function(newSp) {
        Species.update({_id: newSp.id}, {$set:{species: newSp.species, images: newSp.images, description: newSp.description, date_range: newSp.date_range, locations: newSp.locations}});
    }
});