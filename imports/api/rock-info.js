import { Mongo } from 'meteor/mongo';

const ri = new Mongo.Collection('rock_info');
const riCount = ri.find().count();

if(riCount === 0) {
    ri.insert({
        subclass_type: "Plutonic/Intrustive",
        rock_name: "Igneous"
    });

    ri.insert({
        subclass_type: "Volcanic/Extrusive",
        rock_name: "Igneous"
    });

    ri.insert({
        subclass_type: "Shale",
        rock_name: "Sedimentary"
    });

    ri.insert({
        subclass_type: "Limestone",
        rock_name: "Sedimentary"
    });

    ri.insert({
        subclass_type: "Sandstone",
        rock_name: "Sedimentary"
    });

    ri.insert({
        subclass_type: "Arkoses",
        rock_name: "Sedimentary"
    });

    ri.insert({
        subclass_type: "Foliated",
        rock_name: "Metamorphic"
    });

    ri.insert({
        subclass_type: "Non-Foliated",
        rock_name: "Metamorphic"
    });
}

export { ri as RockInfo }