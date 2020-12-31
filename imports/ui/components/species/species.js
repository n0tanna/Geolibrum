import './species.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

let domain = "";
let kingdom = "";
let phylum = "";
let classes = "";
let order = "";
let family = "";
let genus = "";

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

let dbHolder = new ReactiveArray();

function loadInfo(info, taxLevel, pluralInfo) {
    if (info === "") {
        dbHolder.clear();
        let tempHolderStart = Species.find().fetch();
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
            console.log(pluralInfo);
            if (values[info] === taxLevel) {
                let tempHolder = values[pluralInfo];
                console.log(tempHolder);
                dbHolder.clear();
                tempHolder.forEach(function (innerValues) {
                    if(innerValues[info] === "N/A" && !(innerValues[info] == "phylum")) {
                        genusHolder.set("yes");
                        console.log("ok");
                    }
                    else {
                        dbHolder.push(innerValues);
                    }
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

        genusName: function () {
            return genus;
        }
    });

    Template.species.onCreated(function nice() {
        loadInfo("");
        dButton.set("true");
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
            loadInfo("domain", domain, "kingdoms");

            kButton.set("");
        },

        'click .phylum': function () {
            phylum = "";
            kingdomHolder.set(kingdom);
            phylumHolder.set("");
            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", domain, "kingdoms");
            loadInfo("kingdom", kingdom, "phylums");

            pButton.set("");
        },

        'click .class': function () {
            classes = "";
            phylumHolder.set(phylum);
            classHolder.set("");
            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", domain, "kingdoms");
            loadInfo("kingdom", kingdom, "phylums");
            loadInfo("phylum", phylum, "classes");

            cButton.set("");
        },

        'click .order': function () {
            order = "";
            classHolder.set(classes);
            orderHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", domain, "kingdoms");
            loadInfo("kingdom", kingdom, "phylums");
            loadInfo("phylum", phylum, "classes");
            loadInfo("class", classes, "orders");

            oButton.set("");
        },

        'click .family': function () {
            family = "";
            orderHolder.set(order);
            familyHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", domain, "kingdoms");
            loadInfo("kingdom", kingdom, "phylums");
            loadInfo("phylum", phylum, "classes");
            loadInfo("class", classes, "orders");
            loadInfo("order", order, "families");

            fButton.set("");
        },

        'click .genus': function () {
            genus = "";
            familyHolder.set(family);
            genusHolder.set("");

            dbHolder.clear();

            loadInfo("");
            loadInfo("domain", domain, "kingdoms");
            loadInfo("kingdom", kingdom, "phylums");
            loadInfo("phylum", phylum, "classes");
            loadInfo("class", classes, "orders");
            loadInfo("order", order, "families");
            loadInfo("family", family, "genera");

            gButton.set("");
        },

        'click .select': function (event) {
            if (domain === "") {
                domain = this.domain;
                domainHolder.set(domain);
                displayDomain.set("");

                loadInfo("domain", domain, "kingdoms");

                dButton.set("true");
            }
            else if (kingdom === "") {
                kingdom = event.currentTarget.getAttribute("id");
                domainHolder.set("");
                kingdomHolder.set(kingdom);

                loadInfo("kingdom", kingdom, "phylums");

                kButton.set("true");
            }
            else if (phylum === "") {
                phylum = event.currentTarget.getAttribute("id");
                kingdomHolder.set("");
                phylumHolder.set(phylum);

                loadInfo("phylum", phylum, "classes");

                pButton.set("true");
            }
            else if (classes === "") {
                classes = event.currentTarget.getAttribute("id");
                phylumHolder.set("");
                classHolder.set(classes);

                loadInfo("class", classes, "orders");

                cButton.set("true");
            }
            else if (order == "") {
                order = event.currentTarget.getAttribute("id");
                classHolder.set("");
                orderHolder.set(order);

                loadInfo("order", order, "families");

                oButton.set("true");
            }
            else if (family == "") {
                family = event.currentTarget.getAttribute("id");
                orderHolder.set("");
                familyHolder.set(order);

                loadInfo("family", family, "genera");

                fButton.set("true");
            }
            else if (genus == "") {
                genus = event.currentTarget.getAttribute("id");
                familyHolder.set("");
                genusHolder.set(order);
                gButton.set("true");
            }
        }
    });
}