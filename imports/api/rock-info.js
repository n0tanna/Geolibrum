import { Mongo } from 'meteor/mongo';

const ri = new Mongo.Collection('rock_info');
const riCount = ri.find().count();

if(riCount === 0) {
    ri.insert({
        rock_info_id: "0",
        subclass_type: "Plutonic/Intrustive",
        rock_name: "Igneous"
    });

    ri.insert({
        rock_info_id: "1",
        subclass_type: "Volcanic/Extrusive",
        rock_name: "Igneous"
    });

    ri.insert({
        rock_info_id: "2",
        subclass_type: "Shale",
        rock_name: "Sedimentary"
    });

    ri.insert({
        rock_info_id: "3",
        subclass_type: "Limestone",
        rock_name: "Sedimentary"
    });

    ri.insert({
        rock_info_id: "4",
        subclass_type: "Sandstone",
        rock_name: "Sedimentary"
    });

    ri.insert({
        rock_info_id: "5",
        subclass_type: "Arkoses",
        rock_name: "Sedimentary"
    });

    ri.insert({
        rock_info_id: "6",
        subclass_type: "Foliated",
        rock_name: "Metamorphic"
    });

    ri.insert({
        rock_info_id: "7",
        subclass_type: "Non-Foliated",
        rock_name: "Metamorphic"
    });
}

export { ri as RockInfo }