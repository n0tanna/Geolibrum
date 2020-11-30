import { Mongo } from 'meteor/mongo';

const mi = new Mongo.Collection('mineral_info');

mi.insert({
    mineral_family_name: "Metals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_family_name: "Semimetals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_family_name: "Nonmetals",
    mineral_group_name: "Native Elements"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Sulfides"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Sulfosalts"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Oxides"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Hydroxides"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Halides"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Carbonates"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Borates"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Sulfates"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Phosphates"
});

mi.insert({
    mineral_family_name: "",
    mineral_group_name: "Silicates"
});

export { mi as MineralInfo }