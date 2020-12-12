import './species.html';
import { Template } from 'meteor/templating';
import { Domains } from '../../../api/species/domains';
import { Kingdoms } from '../../../api/species/kingdoms';
import { Phylums } from '../../../api/species/phylums';

let domain = "";
let kingdom = "";
let phylum = "";

let displayDomain = new ReactiveVar("yes");
let kingdomHolder = new ReactiveVar();
let domainHolder = new ReactiveVar();

let displayArray = new ReactiveArray();

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
        domainNames: () => {
            return Domains.find({});
        }
    });

    Template.kingdomArea.helpers({
        kingdomNames: () => {
            return Kingdoms.find({domain: domain});
        },

        domainName: function () {
            return domain;
        }
    });

    Template.phylumArea.helpers({
        phylumNames: () => {
            return Phylums.find({kingdom: kingdom});
        },

        kingdomName: function () {
            return kingdom;
        },

        displayEntry: function () {
            return displayArray.list();
        }
    });

    Template.species.events({
        'click .domain': function () {
            displayDomain.set("yes");
            domain = "";
            kingdom = "";
            domainHolder.set("");
            kingdomHolder.set("");
        },

        'click .kingdom': function () {
            kingdom = "";
            domainHolder.set(domain);
            kingdomHolder.set("");
        },

        'click .select': function (event) {
            if (domain === "") {
                domain = this.domain;
                domainHolder.set(domain);
                displayDomain.set("");    
            }
            else if (kingdom === "") {
                kingdom = document.getElementById("kingdom").textContent;
                domainHolder.set("");
                kingdomHolder.set(kingdom);
            }
            else if (phylum === "") {
                kingdomHolder.set("");
            }
        }
    });

    Template.phylumArea.events({
        'submit #phylumForm': function (event) {
            event.preventDefault();

            phylum = event.target.newPhylum.value;
            let extinct = event.target.extinctOption.value;
            let description = event.target.phylumDes.value;

            const newPhylum = {
                kingdom: kingdom,
                phylum: phylum,
                extinct: extinct,
                description: description
            }
            displayArray.push(newPhylum);
            console.log(displayArray);
        }
    });
}