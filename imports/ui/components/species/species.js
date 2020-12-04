import './species.html';
import { Template } from 'meteor/templating';
import { Domains } from '../../../api/species/domains';
import { Kingdoms } from '../../../api/species/kingdoms';
import { Phylums } from '../../../api/species/phylums';

var domain = "";
var kingdom = "";

if (Meteor.isClient) {
    Template.speciesEntry.helpers({
        domainNames: () => {
            return Domains.find({});
        }
    });

    function clearHTML() {
        var remove = document.getElementById('holder');
        remove.parentNode.removeChild(remove);
        document.getElementById('holderForm').innerHTML = '<div id="holder"></div>';
    }

    function fillHTMLHeader(name, specificName, previousName) {
        document.getElementById('holder').innerHTML =
            '<h4>Select a ' + name + ' within the ' + specificName + ' ' + previousName + '</h4>\
                         <ul id="list"></ul>';
    }

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
            }
            else if (kingdom === "") {
                kingdom = event.target.textContent;
                clearHTML();

                phylumsFound = Phylums.find({ kingdom: kingdom }).fetch();
                fillHTMLHeader("Phylum", kingdom, "Kingdom");

                if (phylumsFound.length > 0) {
                    for (i = 0; i < phylumsFound.length; i++) {
                        document.getElementById('list').innerHTML += '<li>' + phylumsFound[i].phylum + '</li>'
                    }
                }
                else {
                    document.getElementById('holder').innerHTML +=
                        '<h5>Add new Phylum(s)</h5>' +
                        '<label for="description">Name:</label>' +
                        '<input type="text" name="name" id="name">' +
                        '<br>' +
                        '<label for="description">Description:</label>' +
                        '<input type="text" name="description" id="description">' +
                        '<br>' +
                        '<input type="submit" id="addPhylum" value="Add">';
                }
            }
        }
    });
}