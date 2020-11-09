import { Mongo } from 'meteor/mongo';

const mi = new Mongo.Collection('mineral_info');

mi.insert({
    mineral_info_id: "0",
    mineral_family_name: "Metals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_info_id: "1",
    mineral_family_name: "Semimetals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_info_id: "2",
    mineral_family_name: "Nonmetals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_info_id: "3",
    mineral_family_name: "",
    mineral_group_name: "Sulfides"
});

mi.insert({
    mineral_info_id: "4",
    mineral_family_name: "",
    mineral_group_name: "Sulfosalts"
});

mi.insert({
    mineral_info_id: "5",
    mineral_family_name: "",
    mineral_group_name: "Oxides"
});

mi.insert({
    mineral_info_id: "6",
    mineral_family_name: "",
    mineral_group_name: "Hydroxides"
});

mi.insert({
    mineral_info_id: "7",
    mineral_family_name: "",
    mineral_group_name: "Halides"
});

mi.insert({
    mineral_info_id: "8",
    mineral_family_name: "",
    mineral_group_name: "Carbonates"
});

mi.insert({
    mineral_info_id: "9",
    mineral_family_name: "",
    mineral_group_name: "Borates"
});

mi.insert({
    mineral_info_id: "10",
    mineral_family_name: "",
    mineral_group_name: "Sulfates"
});

mi.insert({
    mineral_info_id: "11",
    mineral_family_name: "",
    mineral_group_name: "Phosphates"
});

mi.insert({
    mineral_info_id: "12",
    mineral_family_name: "",
    mineral_group_name: "Silicates"
});

export { mi as MineralInfo }