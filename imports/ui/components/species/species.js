import './species.html';
import { Template } from 'meteor/templating';
import { Taxonomy } from '/imports/api/taxonomy.js';
import { GeologicalTime } from '/imports/api/geological-time.js';
import { uploadImage } from '../util.js';
import '/imports/api/species/methods.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

let domain = "";
let kingdom = "";
let phylum = "";
let classes = "";
let order = "";
let family = "";
let genus = "";

let eon = "";
let era = "";
let time = "";

let timeChosen = "";
let textTimeArea = "";

let kButton = new ReactiveVar();
let dButton = new ReactiveVar();
let pButton = new ReactiveVar();
let cButton = new ReactiveVar();
let oButton = new ReactiveVar();
let fButton = new ReactiveVar();
let gButton = new ReactiveVar();

let displayDomain = new ReactiveVar("yes");
let kingdomHolder = new ReactiveVar();
let domainHolder = new ReactiveVar();
let phylumHolder = new ReactiveVar();
let classHolder = new ReactiveVar();
let orderHolder = new ReactiveVar();
let familyHolder = new ReactiveVar();
let genusHolder = new ReactiveVar();

let timeNHolder = new ReactiveVar();

let error = new ReactiveVar();

let displayEons = new ReactiveVar("yes");
let displayEras = new ReactiveVar();
let displayTime = new ReactiveVar();

let dbHolder = new ReactiveArray();
let timeHolder = new ReactiveArray();

function loadInfo(info, info2, taxLevel, pluralInfo) {
    if (info === "") {
        dbHolder.clear();
        let tempHolderStart = Taxonomy.find().fetch();
        console.log(tempHolderStart);
        let tempHolderDoms = new Array();

        tempHolderStart.forEach(element => tempHolderDoms.push(element.domains));

        tempHolderDoms.forEach(function (domainValue) {
            domainValue.forEach(function (domain) {
                dbHolder.push(domain);
            });
        });
    }
    else {
        dbHolder.forEach(function (values) {
            if (values[info] === taxLevel) {
                let tempHolder = values[pluralInfo];
                dbHolder.clear();
                tempHolder.forEach(function (innerValues) {
                    dbHolder.push(innerValues);
                });
            }
        });
    }

    dbHolder.forEach(function (value) {
        let name = value[info2];
        if (name === "N/A" && !(value.hasOwnProperty('description'))) {
            genusHolder.set("true");
        }
        else {
            genusHolder.set("");
        }
    });
}

function loadTime(timeTitle, timeName, pluralInfo) {
    if (timeTitle === "") {
        timeHolder.clear();
        let tempHolderStart = GeologicalTime.find().fetch();
        let tempHolderTime = new Array();
        tempHolderStart.forEach(element => tempHolderTime.push(element.eons));

        tempHolderTime.forEach(function (timeValue) {
            timeValue.forEach(function (time) {
                timeHolder.push(time);
            });
        });

    }
    else {
        timeHolder.forEach(function (values) {
            if (values[timeTitle] === timeName) {
                let tempHolder = values[pluralInfo];
                timeHolder.clear();
                tempHolder.forEach(function (innerValues) {
                    timeHolder.push(innerValues);
                });
            }
        });
    }
}

if (Meteor.isClient) {
    Template.species.helpers({
        startValue: function () {
            return displayDomain.get();
        },

        kingdomValue: function () {
            return kingdomHolder.get();
        },

        domainValue: function () {
            return domainHolder.get();
        },

        phylumValue: function () {
            return phylumHolder.get();
        },

        classValue: function () {
            return classHolder.get();
        },

        orderValue: function () {
            return orderHolder.get();
        },

        familyValue: function () {
            return familyHolder.get();
        },

        genusValue: function () {
            return genusHolder.get();
        },

        buttonDomain: function () {
            return dButton.get();
        },

        buttonKingdom: function () {
            return kButton.get();
        },

        buttonPhylum: function () {
            return pButton.get();
        },

        buttonClass: function () {
            return cButton.get();
        },

        buttonOrder: function () {
            return oButton.get();
        },

        buttonFamily: function () {
            return fButton.get();
        },

        buttonGenus: function () {
            return gButton.get();
        }
    });

    Template.domainArea.helpers({
        domainNames: function () {
            return dbHolder.list();
        }
    });

    Template.kingdomArea.helpers({
        kingdomNames: function () {
            return dbHolder.list();
        },

        domainName: function () {
            return domain;
        }
    });

    Template.phylumArea.helpers({
        phylumNames: function () {
            return dbHolder.list();
        },

        kingdomName: function () {
            return kingdom;
        }
    });

    Template.classArea.helpers({
        classNames: function () {
            return dbHolder.list();
        },

        phylumName: function () {
            return phylum;
        }
    });

    Template.orderArea.helpers({
        orderNames: function () {
            return dbHolder.list();
        },

        className: function () {
            return classes;
        }
    });

    Template.familyArea.helpers({
        familyNames: function () {
            return dbHolder.list();
        },

        orderName: function () {
            return order;
        }
    });

    Template.genusArea.helpers({
        genusNames: function () {
            return dbHolder.list();
        },

        familyName: function () {
            return family;
        }
    });

    Template.speciesArea.helpers({
        deleteButton: function () {
            return timeNHolder.get();
        },

        errorDisplay: function () {
            return error.get();
        }
    });

    Template.timeModal.helpers({
        timePeriods: function () {
            return timeHolder.list();
        },

        eonDisplay: function () {
            return displayEons.get();
        },

        eraDisplay: function () {
            return displayEras.get();
        },

        timeDisplay: function () {
            return displayTime.get();
        },

        eonName: function () {
            return eon;
        },

        eraName: function () {
            return era;
        }
    });

    Template.species.onCreated(function nice() {
        loadInfo("");
        loadTime("");
    });

    Template.speciesArea.events({
        'submit #formEntry': function (e) {
            e.preventDefault();

            let name = e.target.speciesName.value;
            let ext = e.target.extinct.value;
            let desc = e.target.description.value;
            let img = e.target.imageUpload.files;
            let imgArray = new Array();

            if(name === "") {
                error.set("yes");
            }
            else {
                error.set();
                
                if(img === "") {

                }
                else {
                    for(i = 0; i < img.length; i++) {
                        let imageLink = "s3://geolibrum-assets/" + "species/species/" + img[i].name;
                        imgArray.push(imageLink);
                        uploadImage(img[i], "species/species/" + img[i].name);
                    }
                    inputObj.images = imgArray;
                }

            } 
        },

        'click .time': function () {
            Modal.show('timeModal');
            textTimeArea = document.getElementById('timePeriod');
        },

        'click .remove': function () {
            textTimeArea.textContent = "";
            timeNHolder.set("");
        }
    });

    Template.timeModal.events({
        'click .eon': function () {
            displayEras.set("");
            displayEons.set("yes");

            eon = "";

            loadTime("");
        },

        'click .era': function () {
            displayEras.set(era);
            displayTime.set("");

            era = "";

            loadTime("");
            loadTime("eon", eon, "eras");
        },

        'click .select': function (e) {
            if (eon === "") {
                eon = this.eon;
                displayEons.set("");
                displayEras.set(eon);

                loadTime("eon", eon, "eras");
            }
            else if (era === "") {
                era = e.currentTarget.getAttribute("id");
                displayEras.set("");
                displayTime.set(era);

                loadTime("era", era, "time_periods");
            }
            else if (time === "") {
                time = e.currentTarget.getAttribute("id");
                timeChosen = eon + ", " + era + ", " + time;
                textTimeArea.textContent = timeChosen;
                timeNHolder.set("yes");

                loadTime("");
                eon = "";
                era = "";
                time = "";
                displayEons.set("yes");
                displayEras.set("");
                displayTime.set("");
            }
        }
    });

    Template.species.events({
        'click .domain': function () {
            displayDomain.set("yes");
            domain = "";
            domainHolder.set("");
            kingdomHolder.set("");

            loadInfo("");

            dButton.set("");
        },

        'click .kingdom': function () {
            kingdom = "";
            domainHolder.set(domain);
            kingdomHolder.set("");
            phylumHolder.set("");
            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");

            kButton.set("");
            let button = document.getElementById('domainButton');
            button.disabled = false;
        },

        'click .phylum': function () {
            phylum = "";
            kingdomHolder.set(kingdom);
            phylumHolder.set("");
            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");
            loadInfo("kingdom", "phylum", kingdom, "phylums");

            pButton.set("");
            let button = document.getElementById('kingdomButton');
            button.disabled = false;
        },

        'click .class': function () {
            classes = "";
            phylumHolder.set(phylum);
            classHolder.set("");
            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");
            loadInfo("kingdom", "phylum", kingdom, "phylums");
            loadInfo("phylum", "class", phylum, "classes");

            cButton.set("");
            let button = document.getElementById('phylumButton');
            button.disabled = false;
        },

        'click .order': function () {
            order = "";
            classHolder.set(classes);
            orderHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");
            loadInfo("kingdom", "phylum", kingdom, "phylums");
            loadInfo("phylum", "class", phylum, "classes");
            loadInfo("class", "order", classes, "orders");

            oButton.set("");
            let button = document.getElementById('classButton');
            button.disabled = false;
        },

        'click .family': function () {
            family = "";
            orderHolder.set(order);
            familyHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");
            loadInfo("kingdom", "phylum", kingdom, "phylums");
            loadInfo("phylum", "class", phylum, "classes");
            loadInfo("class", "order", classes, "orders");
            loadInfo("order", "family", order, "families");

            fButton.set("");
            let button = document.getElementById('orderButton');
            button.disabled = false;
        },

        'click .genus': function () {
            genus = "";
            familyHolder.set(family);
            genusHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", "kingdom", domain, "kingdoms");
            loadInfo("kingdom", "phylum", kingdom, "phylums");
            loadInfo("phylum", "class", phylum, "classes");
            loadInfo("class", "order", classes, "orders");
            loadInfo("order", "family", order, "families");
            loadInfo("family", "genus", family, "genera");

            gButton.set("");
            let button = document.getElementById('familyButton');
            button.disabled = false;
        },

        'click .select': function (event) {
            if (domain === "") {
                domain = this.domain;
                domainHolder.set(domain);
                displayDomain.set("");

                loadInfo("domain", "kingdom", domain, "kingdoms");

                dButton.set("true");
            }
            else if (kingdom === "") {
                kingdom = event.currentTarget.getAttribute("id");
                domainHolder.set("");
                kingdomHolder.set(kingdom);

                loadInfo("kingdom", "phylum", kingdom, "phylums");

                kButton.set("true");
                let button = document.getElementById('domainButton');
                button.disabled = true;
            }
            else if (phylum === "") {
                phylum = event.currentTarget.getAttribute("id");
                kingdomHolder.set("");
                phylumHolder.set(phylum);

                loadInfo("phylum", "class", phylum, "classes");

                let response = genusHolder.get();
                if (response === 'true') {
                    phylumHolder.set("");
                }

                pButton.set("true");
                let button = document.getElementById('kingdomButton');
                button.disabled = true;
            }
            else if (classes === "") {
                classes = event.currentTarget.getAttribute("id");
                phylumHolder.set("");
                classHolder.set(classes);

                loadInfo("class", "order", classes, "orders");

                let response = genusHolder.get();
                if (response === 'true') {
                    classHolder.set("");
                }

                cButton.set("true");
                let button = document.getElementById('phylumButton');
                button.disabled = true;
            }
            else if (order == "") {
                order = event.currentTarget.getAttribute("id");
                classHolder.set("");
                orderHolder.set(order);

                loadInfo("order", "family", order, "families");

                let response = genusHolder.get();
                if (response === 'true') {
                    orderHolder.set("");
                }

                oButton.set("true");
                let button = document.getElementById('classButton');
                button.disabled = true;
            }
            else if (family == "") {
                family = event.currentTarget.getAttribute("id");
                orderHolder.set("");
                familyHolder.set(order);

                loadInfo("family", "genus", family, "genera");

                let response = genusHolder.get();
                if (response === 'true') {
                    familyHolder.set("");
                }

                let button = document.getElementById('orderButton');
                button.disabled = true;
                fButton.set("true");
            }
            else if (genus == "") {
                genus = event.currentTarget.getAttribute("id");
                familyHolder.set("");
                genusHolder.set(order);

                gButton.set("true");
                let button = document.getElementById('familyButton');
                button.disabled = true;
            }
        }
    });
}