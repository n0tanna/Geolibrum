import './species.html';
import { Template } from 'meteor/templating';
import { Domains } from '../../../api/species/domains';
import { Kingdoms } from '../../../api/species/kingdoms';
import { Phylums } from '../../../api/species/phylums';
import '/imports/api/species/methods.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { uploadImage } from '../util';
import { deleteImage } from '../util';

let domain = "";
let kingdom = "";
let phylum = "";

let displayDomain = new ReactiveVar("yes");
let status = new ReactiveVar(null);
let kingdomHolder = new ReactiveVar();
let domainHolder = new ReactiveVar();
let phylumHolder = new ReactiveVar();
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
            return Kingdoms.find({ domain: domain });
        },

        domainName: function () {
            return domain;
        }
    });

    Template.phylumArea.helpers({
        phylumNames: () => {
            return Phylums.find({ kingdom: kingdom });
        },

        kingdomName: function () {
            return kingdom;
        },

        displayEntry: function () {
            return displayArray.list();
        },

        statusDisplay: function () {
            return status.get();
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
                kingdom = event.currentTarget.getAttribute("id");
                domainHolder.set("");
                kingdomHolder.set(kingdom);
            }
            else if (phylum === "") {
                kingdomHolder.set("");
                phylum = event.currentTarget.getAttribute("id");
            }
        }
    });

    Template.phylumArea.events({
        'submit #phylumForm': function (event) {
            event.preventDefault();
            status.set("");

            phylum = event.target.newPhylum.value;
            let extinct = event.target.extinctOption.value;
            let description = event.target.phylumDes.value;
            let count = event.target.newCount.value;
            let image = document.getElementById('phylumImage').files[0];

            let directory = 'species/phylum/' + image.name;
            uploadImage(image, directory);
            let imageURL = 'https://s3.amazonaws.com/' + Meteor.settings.public.S3Bucket + '/' + directory;

            const newPhylum = {
                image: imageURL,
                imageDirectory: directory,
                domain: domain,
                kingdom: kingdom,
                phylum: phylum,
                extinct: extinct,
                count: count,
                description: description
            }
            displayArray.push(newPhylum);
            event.target.reset();
        },

        'click .add': function () {
            if (displayArray.length == 0) {
                status.set("Please add a Phylum.");
            }
            else {
                displayArray.forEach(function (holder, index) {
                    Meteor.call('addPhylum', holder);
                });

                displayArray.length = 0;
                displayArray.push();
                status.set("Added successfully.");
            }
        },

        'click .clear': function () {
            displayArray.Array.forEach(function (holder, index) {
                let imageDir = holder.imageDirectory;
                deleteImage(imageDir);
            });

            displayArray.length = 0;
            displayArray.push();
        },

        'click .remove': function () {
            deleteImage(this.imageDirectory);
            displayArray.remove(this);
        },

        'click .editPhylum': function () {
            currentSelected = this;

            Modal.show('editPhylumModal');

            let phylumName = document.getElementById('phylumName');
            phylumName.value = currentSelected.phylum;

            let extinctValue = document.getElementById('extinctOpt');
            extinctValue.value = currentSelected.extinct;

            let countValue = document.getElementById('countOpt');
            countValue.value = currentSelected.count;

            let descriptionValue = document.getElementById('phylumDesOpt');
            descriptionValue.value = currentSelected.description;
        },

        'click .edit': function () {
            Modal.show('editExtPhylumModal');
        }
    });
}