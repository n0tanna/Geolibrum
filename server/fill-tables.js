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
import '/imports/api/species/methods.js';
import '/imports/api/log-data/methods.js';

if (Meteor.isServer) {
    const domainsCount = Domains.find().count();
    const kingdomsCount = Kingdoms.find().count();
    const mineralInfoCount = MineralInfo.find().count();
    const rockInfoCount = RockInfo.find().count();
    const geologicalTimeCount = GeologicalTime.find().count();
    const phylumsCount = Phylums.find().count();

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

    //PHYLUMS INSERT
    if (phylumsCount === 0) {
        Phylums.insert({
            domain: "Eukaryota",
            kingdom: "Animals",
            phylum: "Acanthocephala",
            image: "",
            count: 1420, 
            extinct: "No",
            description: 
            "Acanthocephala means thorny head,  and are also referred to" +
            " as thorny-headed worms. They have a reversible spiny proboscis that " +
            "bears many rows of hooked spines."

        });

        Phylums.insert({
            domain: "Eukaryota",
            kingdom: "Animals",
            phylum: "Annelida",
            image: "",
            count: 17000,
            extinct: "No",
            description: 
            "Annelida means little ring, and are also referred to as segmented worms" +
            ". They have multiple circular segments."
        });

        Phylums.insert({
            domain: "Eukaryota",
            kingdom: "Animals",
            phylum: "Arthropoda",
            image: "",
            count: 1270000,
            extinct: "No",
            description: 
            "Arthropoda means jointed foot, and are also referred to as Arthropods. " +
            " They have segmented bodies and jointed limbs, with a Chitin exoskeleton."
        });

        Phylums.insert({
            domain: "Eukaryota",
            kingdom: "Animals",
            phylum: "Brachiopoda",
            image: "",
            count: 12500,
            extinct: "No",
            description: 
            "Brachiopoda means arm footm and are also referred to as Lampshells. " +
            "They are lophophore and pedicle,"
        });

        Phylums.insert({
            domain: "Eukaryote",
            kingdom: "Animals",
            phylum: "Brachiopoda",
            image: "",
            count: 6000,
            extinct: "No",
            description: 
            ""
        });
    }

    //KINGDOMS INSERT
    if (kingdomsCount === 0) {
        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Fungi",
            image: "",
            description:
                "Fungi are multicellular(mostly), eukaryotic, and are heterotrpohs. " +
                "They gain nutrition through absorption, and are made up of " +
                "feathery filaments called hyphae. These hyphae group together" +
                " to form a conglomerate called the mycelium. They can reproduce sexually " +
                "and asexually. They also have symbiotic associations with plants and bacteria."
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Animals",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Plants",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Ciliates",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Slimemoids",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Entamoebae",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Flagellates",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Trichomonads",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Microsporidia",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Eukaryota",
            kingdom: "Diplomonads",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Halophiles",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanosarcina",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanobacterium",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Methanosoccus",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "T.celer",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Thermoproteus",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Archaea",
            kingdom: "Pyrodicticum",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Green Filamentous Bacteria",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Cyanobacteria",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Gram positives",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Spirochetes",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Proteobacteria",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Planctomyces",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Bacteroides Cytophaga",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Thermotoga",
            image: "",
            description: ""
        });

        Kingdoms.insert({
            domain: "Bacteria",
            kingdom: "Aquifex",
            image: "",
            description: ""
        });
    }

    //DOMAINS INSERT
    if (domainsCount === 0) {
        Domains.insert({
            domain: "Archaea",
            image: "",
            description:
                "The Archaea are a domain of bacteria-like " +
                "organisms, but they are not the same. Their " +
                "cell walls and their RNA are very different " +
                "from the bacteria domains. They are also often extremophiles."
        });

        Domains.insert({
            domain: "Bacteria",
            image: "",
            description:
                "The Bacteria are a domain also known as prokaryotes." +
                "They have no organelles or membrane-bound nucleus. This is " +
                "possibly the largest domain out of them all."

        });

        Domains.insert({
            domain: "Eukaryota",
            image: "",
            description:
                "The Eukaryotas have membrane bound nucleus and organelles." +
                "They are not unicellular like the other two domains."
        });
    }
}


