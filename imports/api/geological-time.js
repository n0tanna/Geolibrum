import { Mongo } from 'meteor/mongo';

const gt = new Mongo.Collection('geological_time');
const gtCount = gt.find().count();

if(gtCount === 0) {
    gt.insert({
        time_period_name: "Siderian",
        era_info: {
            era_name: "Paleproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "2,500 - 1,600 Ma"
        },
        time_frame: "2,500 - 2,300 Ma"
    });

    gt.insert({
        time_period_name: "Rhyacian",
        era_info: {
            era_name: "Paleproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "2,500 - 1,600 Ma"
        },
        time_frame: "2,300 - 2,050 Ma"
    });

    gt.insert({
        geological_time_id: "2",
        time_period_name: "Orosirian",
        era_info: {
            era_name: "Paleproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "2,500 - 1,600 Ma"
        },
        time_frame: "2,050 - 1,800 Ma"
    });

    gt.insert({
        time_period_name: "Slatherian",
        era_info: {
            era_name: "Paleproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "2,500 - 1,600 Ma"
        },
        time_frame: "1,800 - 1,600 Ma"
    });

    gt.insert({
        time_period_name: "Calymmiam",
        era_info: {
            era_name: "Mesoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,600 - 1,000 Ma"
        },
        time_frame: "1,600 - 1,400 Ma"
    });

    gt.insert({
        time_period_name: "Ectasian",
        era_info: {
            era_name: "Mesoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,600 - 1,000 Ma"
        },
        time_frame: "1,400 - 1,200 Ma"
    });

    gt.insert({
        time_period_name: "Stenian",
        era_info: {
            era_name: "Mesoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,600 - 1,000 Ma"
        },
        time_frame: "1,200 - 1,000 Ma"
    });

    gt.insert({
        time_period_name: "Tonian",
        era_info: {
            era_name: "Neoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,000 - 541 Ma"
        },
        time_frame: "1,000 - 720 Ma"
    });

    gt.insert({
        time_period_name: "Cryogenian",
        era_info: {
            era_name: "Neoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,000 - 541 Ma"
        },
        time_frame: "720 - 635 Ma"
    });

    gt.insert({
        time_period_name: "Ediacaran",
        era_info: {
            era_name: "Neoproterozoic",
            eon_info: {
                eon_name:"Proterozoic",
                time_frame: "2,500 - 541 Me"
            },
            time_frame: "1,000 - 541 Ma"
        },
        time_frame: "635 - 541 Ma"
    });

    gt.insert({
        time_period_name: "Cambrian",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "541 - 485.4 Ma"
    });

    gt.insert({
        time_period_name: "Ordovician",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "485.4 - 443.8 Ma"
    });

    gt.insert({
        time_period_name: "Silurian",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "443.8 - 419.2 Ma"
    });

    gt.insert({
        time_period_name: "Devonian",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "419.2 - 358.9 Ma"
    });

    gt.insert({
        time_period_name: "Carboniferous",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "358.9 - 298.9 Ma"
    });

    gt.insert({
        time_period_name: "Permian",
        era_info: {
            era_name: "Paleozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "541 - 251.902 Ma"
        },
        time_frame: "298.9 - 251.902 Ma"
    });

    gt.insert({
        time_period_name: "Triassic",
        era_info: {
            era_name: "Mesozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "251.902 - 66 Ma"
        },
        time_frame: "251.9 - 201.3 Ma"
    });

    gt.insert({
        time_period_name: "Jurassic",
        era_info: {
            era_name: "Mesozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "251.902 - 66 Ma"
        },
        time_frame: "201.3 - 145 Ma"
    });

    gt.insert({
        time_period_name: "Cretaceous",
        era_info: {
            era_name: "Mesozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "251.902 - 66 Ma"
        },
        time_frame: "145 - 66 Ma"
    });
    
    gt.insert({
        time_period_name: "Paleogene",
        era_info: {
            era_name: "Cenozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "66 Ma - Current day"
        },
        time_frame: "66 - 23 Ma"
    });

    gt.insert({
        time_period_name: "Neogene",
        era_info: {
            era_name: "Cenozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "66 Ma - Current day"
        },
        time_frame: "23 - 2.5 Ma"
    });

    gt.insert({
        time_period_name: "Quaternary",
        era_info: {
            era_name: "Cenozoic",
            eon_info: {
                eon_name:"Phanerozoic",
                time_frame: "541 - Current Day"
            },
            time_frame: "66 Ma - Current day"
        },
        time_frame: "2.5 - Current day"
    });

    gt.insert({
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

    gt.insert({
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

    gt.insert({
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

    gt.insert({
        time_period_name: "No periods created",
        era_info:  {
            era_name: "Neoarchean",
            eon_info: {
                eon_name: "Archean",
                time_frame: "4,000 - 2,500 Me"
            },
            time_frame: "2,800 to 2,500 Ma"
        },
        time_frame: ""
    });

    gt.insert({
        time_period_name: "No periods created",
        era_info: {
            era_name: "No eras created",
            eon_info: {
                eon_name:"Hadean",
                time_frame: "Formation of Earth - 4,000 Ma"
            },
        },
        time_frame: ""
    });

}
export { gt as GeologicalTime }