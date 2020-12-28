import './species.html';
import { Template } from 'meteor/templating';
import { Species } from '/imports/api/species/species.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

let domain = "";
let kingdom = "";
let phylum = "";

let displayDomain = new ReactiveVar("yes");
let kingdomHolder = new ReactiveVar();
let domainHolder = new ReactiveVar();
let phylumHolder = new ReactiveVar();

let dbHolder = new ReactiveArray();

function loadDomains() {
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

function loadKingdoms(domain) {
    dbHolder.forEach(function (domains) {
        if (domains.domain === domain) {
            let tempHolder = domains.kingdoms;
            dbHolder.clear();
            tempHolder.forEach(function (kingdoms) {
                dbHolder.push(kingdoms);
            });
        }
    });
}

function loadPhylums(kingdom) {
    dbHolder.forEach(function (kingdoms) {
        if (kingdoms.kingdom === kingdom) {
            let tempHolder = kingdoms.phylums;
            dbHolder.clear();
            tempHolder.forEach(function (phylums) {
                dbHolder.push(phylums);
            });
        }
    });
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
        phylumNames: function() {
            return dbHolder.list();
        },

        kingdomName: function () {
            return kingdom;
        }
    });

    Template.species.onCreated(function nice() {
        loadDomains();
    });

    Template.species.events({
        'click .domain': function () {
            displayDomain.set("yes");
            domain = "";
            kingdom = "";
            domainHolder.set("");
            kingdomHolder.set("");
            loadDomains();
        },

        'click .kingdom': function () {
            kingdom = "";
            domainHolder.set(domain);
            kingdomHolder.set("");
            dbHolder.clear();
            loadDomains();
            loadKingdoms(domain);
        },

        'click .select': function (event) {
            if (domain === "") {
                domain = this.domain;
                domainHolder.set(domain);
                displayDomain.set("");
                loadKingdoms(domain);
            }
            else if (kingdom === "") {
                kingdom = event.currentTarget.getAttribute("id");
                domainHolder.set("");
                kingdomHolder.set(kingdom);
                loadPhylums(kingdom);
            }
            else if (phylum === "") {
                kingdomHolder.set("");
                phylum = event.currentTarget.getAttribute("id");
                phylumHolder.set(phylum);
            }
        }
    });
}