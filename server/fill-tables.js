import { RockInfo } from "/imports/api/rock-info";
import { MineralInfo } from "/imports/api/mineral-info";
import { GeologicalTime } from "/imports/api/geological-time";
import { LogData } from "/imports/api/log-data/log-data";
import { Location } from "/imports/api/location/location";
import { Species } from "/imports/api/species/species";
import { Domains } from "/imports/api/species/domains";
import { Kingdoms } from "/imports/api/species/kingdoms";
import { Phylums } from "/imports/api/species/phylums";
import '/imports/api/location/methods.js';
import '/imports/api/log-data/methods.js';

if (Meteor.isServer) {
    const domainsCount = Domains.find().count();
    const kingdomsCount = Kingdoms.find().count();
    const mineralInfoCount = MineralInfo.find().count();
    const rockInfoCount = RockInfo.find().count();
    const geologicalTimeCount = GeologicalTime.find().count();

    if (geologicalTimeCount === 0) {
        GeologicalTime.insert({
            time_period_name: "Siderian",
            era_info: {
                era_name: "Paleproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "2,500 - 1,600 Ma"
            },
            time_frame: "2,500 - 2,300 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Rhyacian",
            era_info: {
                era_name: "Paleproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "2,500 - 1,600 Ma"
            },
            time_frame: "2,300 - 2,050 Ma"
        });

        GeologicalTime.insert({
            geological_time_id: "2",
            time_period_name: "Orosirian",
            era_info: {
                era_name: "Paleproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "2,500 - 1,600 Ma"
            },
            time_frame: "2,050 - 1,800 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Slatherian",
            era_info: {
                era_name: "Paleproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "2,500 - 1,600 Ma"
            },
            time_frame: "1,800 - 1,600 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Calymmiam",
            era_info: {
                era_name: "Mesoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,600 - 1,000 Ma"
            },
            time_frame: "1,600 - 1,400 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Ectasian",
            era_info: {
                era_name: "Mesoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,600 - 1,000 Ma"
            },
            time_frame: "1,400 - 1,200 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Stenian",
            era_info: {
                era_name: "Mesoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,600 - 1,000 Ma"
            },
            time_frame: "1,200 - 1,000 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Tonian",
            era_info: {
                era_name: "Neoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,000 - 541 Ma"
            },
            time_frame: "1,000 - 720 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Cryogenian",
            era_info: {
                era_name: "Neoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,000 - 541 Ma"
            },
            time_frame: "720 - 635 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Ediacaran",
            era_info: {
                era_name: "Neoproterozoic",
                eon_info: {
                    eon_name: "Proterozoic",
                    time_frame: "2,500 - 541 Me"
                },
                time_frame: "1,000 - 541 Ma"
            },
            time_frame: "635 - 541 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Cambrian",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "541 - 485.4 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Ordovician",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "485.4 - 443.8 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Silurian",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "443.8 - 419.2 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Devonian",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "419.2 - 358.9 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Carboniferous",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "358.9 - 298.9 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Permian",
            era_info: {
                era_name: "Paleozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "541 - 251.902 Ma"
            },
            time_frame: "298.9 - 251.902 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Triassic",
            era_info: {
                era_name: "Mesozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "251.902 - 66 Ma"
            },
            time_frame: "251.9 - 201.3 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Jurassic",
            era_info: {
                era_name: "Mesozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "251.902 - 66 Ma"
            },
            time_frame: "201.3 - 145 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Cretaceous",
            era_info: {
                era_name: "Mesozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "251.902 - 66 Ma"
            },
            time_frame: "145 - 66 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Paleogene",
            era_info: {
                era_name: "Cenozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "66 Ma - Current day"
            },
            time_frame: "66 - 23 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Neogene",
            era_info: {
                era_name: "Cenozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "66 Ma - Current day"
            },
            time_frame: "23 - 2.5 Ma"
        });

        GeologicalTime.insert({
            time_period_name: "Quaternary",
            era_info: {
                era_name: "Cenozoic",
                eon_info: {
                    eon_name: "Phanerozoic",
                    time_frame: "541 - Current Day"
                },
                time_frame: "66 Ma - Current day"
            },
            time_frame: "2.5 - Current day"
        });

        GeologicalTime.insert({
            time_period_name: "No periods created",
            era_info: {
                era_name: "Eoarchean",
                eon_info: {
                    eon_name: "Archean",
                    time_frame: "4,000 - 2,500 Me"
                },
                time_frame: "4,000 to 3,600 Ma"
            },
            time_frame: ""
        });

        GeologicalTime.insert({
            time_period_name: "No periods created",
            era_info: {
                era_name: "Paleoarchean",
                eon_info: {
                    eon_name: "Archean",
                    time_frame: "4,000 - 2,500 Me"
                },
                time_frame: "3,600 to 3,200 Ma"
            },
            time_frame: ""
        });

        GeologicalTime.insert({
            time_period_name: "No periods created",
            era_info: {
                era_name: "Mesoarchean",
                eon_info: {
                    eon_name: "Archean",
                    time_frame: "4,000 - 2,500 Me"
                },
                time_frame: "3,200 to 2,800 Ma"
            },
            time_frame: ""
        });

        GeologicalTime.insert({
            time_period_name: "No periods created",
            era_info: {
                era_name: "Neoarchean",
                eon_info: {
                    eon_name: "Archean",
                    time_frame: "4,000 - 2,500 Me"
                },
                time_frame: "2,800 to 2,500 Ma"
            },
            time_frame: ""
        });

        GeologicalTime.insert({
            time_period_name: "No periods created",
            era_info: {
                era_name: "No eras created",
                eon_info: {
                    eon_name: "Hadean",
                    time_frame: "Formation of Earth - 4,000 Ma"
                },
            },
            time_frame: ""
        });

    }

    //ROCK INSERT
    if (rockInfoCount === 0) {
        RockInfo.insert({
            subclass_type: "Plutonic/Intrustive",
            rock_name: "Igneous"
        });

        RockInfo.insert({
            subclass_type: "Volcanic/Extrusive",
            rock_name: "Igneous"
        });

        RockInfo.insert({
            subclass_type: "Shale",
            rock_name: "Sedimentary"
        });

        RockInfo.insert({
            subclass_type: "Limestone",
            rock_name: "Sedimentary"
        });

        RockInfo.insert({
            subclass_type: "Sandstone",
            rock_name: "Sedimentary"
        });

        RockInfo.insert({
            subclass_type: "Arkoses",
            rock_name: "Sedimentary"
        });

        RockInfo.insert({
            subclass_type: "Foliated",
            rock_name: "Metamorphic"
        });

        RockInfo.insert({
            subclass_type: "Non-Foliated",
            rock_name: "Metamorphic"
        });
    }

    //MINERAL INSERT
    if (mineralInfoCount === 0) {
        MineralInfo.insert({
            mineral_family_name: "Metals",
            mineral_group_name: "Native Elements"
        });

        MineralInfo.insert({
            mineral_family_name: "Semimetals",
            mineral_group_name: "Native Elements"
        });

        MineralInfo.insert({
            mineral_family_name: "Nonmetals",
            mineral_group_name: "Native Elements"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Sulfides"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Sulfosalts"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Oxides"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Hydroxides"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Halides"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Carbonates"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Borates"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Sulfates"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Phosphates"
        });

        MineralInfo.insert({
            mineral_family_name: "",
            mineral_group_name: "Silicates"
        });
    }

    //KINGDOMS INSERT
    if (kingdomsCount === 0) {
        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Fungi"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Animals"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Plants"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Ciliates"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Slimemoids"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Entamoebae"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Flagellates"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Trichomonads"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Microsporidia"
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Diplomonads"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Halophiles"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanosarcina"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanobacterium"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanosoccus"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "T.celer"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Thermoproteus"
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Pyrodicticum"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Green Filamentous Bacteria"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Cyanobacteria"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Gram positives"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Spirochetes"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Proteobacteria"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Planctomyces"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Bacteroides Cytophaga"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Thermotoga"
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Aquifex"
        });
    }

    //DOMAINS INSERT
    if (domainsCount === 0) {
        Domains.insert({
            domain: "Archaea"
        });

        Domains.insert({
            domain: "Bacteria"
        });

        Domains.insert({
            domain: "Eukaryota"
        });
    }
}


