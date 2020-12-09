import './species.html';
import { Template } from 'meteor/templating';
import { Domains } from '../../../api/species/domains';
import { Kingdoms } from '../../../api/species/kingdoms';
import { Phylums } from '../../../api/species/phylums';

let domain = "";
let kingdom = "";
let kingdomHolder = new ReactiveVar();
let phylum = "";
let displayArray = new ReactiveArray();

if (Meteor.isClient) {
    Template.speciesEntry.helpers({
        domainNames: () => {
            return Domains.find({});
        },

        displayEntry: function () {
            return displayArray.list();
        },

        kingdomValue: function () {
            return kingdomHolder.get();
        }
    });

    function clearHTML() {
        let remove = document.getElementById('holder');
        remove.parentNode.removeChild(remove);
        document.getElementById('holderForm').innerHTML = '<div id="holder"></div>';
    }

    function fillHTMLHeader(name, specificName, previousName) {
        document.getElementById('holder').innerHTML =
            '<h4>Select a ' + name + ' within the ' + specificName + ' ' + previousName + '</h4>\
                         <ul id="list"></ul>';
    }

    function createEnteredLi(name) {
        document.getElementById('listTitle').innerHTML += '<h4>New ' + name + ' to be added</h4>';
    }

    function addButtons(prevName) {
        document.getElementById('buttonsSubmit').innerHTML +=
        '<button class="btn add">Add All</button>' +
        '<button class="btn clear">Clear</button>'
    }

    function emptyList(name) {
        document.getElementById('holder').innerHTML +=
        '<h4>' + name + '</h4>' +
        '<p>No ' + name + ' exist.</p>';
    }

    Template.phylumArea.events({
        'submit #phylumForm': function (event) {
            event.preventDefault();
            if (phylum === "") {
                createEnteredLi("phylum(s)");
                addButtons("Kingdoms");
            }

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

    Template.speciesEntry.events({
        'click li': function (event) {
            event.preventDefault();

            if (domain === "") {
                domain = this.domain;
                console.log(this);
                clearHTML();

                kingdomsFound = Kingdoms.find({ domain: domain }).fetch();
                fillHTMLHeader("Kingdom", domain, "Domain");

                for (i = 0; i < kingdomsFound.length; i++) {
                    document.getElementById('list').innerHTML += '<li>' + kingdomsFound[i].kingdom + '</li>'
                }
                 document.getElementById('buttonsSubmit').innerHTML += '<button class="btn species">Return to Domains</button>';
               
            }
            else if (kingdom === "") {
                kingdom = event.target.textContent;
                kingdomHolder.set(kingdom);
                
                document.getElementById('buttonsSubmit').innerHTML = "";
                clearHTML();

                phylumsFound = Phylums.find({ kingdom: kingdom }).fetch();
                fillHTMLHeader("Phylum", kingdom, "Kingdom");

                if (phylumsFound.length > 0) {
                    for (i = 0; i < phylumsFound.length; i++) {
                        document.getElementById('list').innerHTML += '<li>' + phylumsFound[i].phylum + '</li>'
                    }
                }
                else {
                    emptyList("phylums");
                }
            }
        }
    });
}