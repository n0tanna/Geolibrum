import { Mongo } from 'meteor/mongo';

const kn = new Mongo.Collection('kingdoms');

const knCount = kn.find().count();

if(knCount === 0) {
    kn.insert({
        kingdom: "Fungi"
    });

    kn.insert({
        kingdom: "Animals"
    });

    kn.insert({
        kingdom: "Plants"
    });

    kn.insert({
        kingdom: "Chromists"
    });

    kn.insert({
        kingdom: "Alveolates"
    });

    kn.insert({
        kingdom: "Rhodophytes"
    });

    kn.insert({
        kingdom: "Flagellates"
    });

    kn.insert({
        kingdom: "Basal Protist"
    });

    kn.insert({
        kingdom: "Halophiles"
    });

    kn.insert({
        kingdom: "Thermophiles"
    });

    kn.insert({
        kingdom: "Heterotrophic Bacteria"
    });

    kn.insert({
        kingdom: "Cyanbacteria"
    });
}

export { kn as Kingdoms }