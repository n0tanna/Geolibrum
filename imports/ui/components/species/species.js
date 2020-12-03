import './species.html';
import { Template } from 'meteor/templating';
import { Kingdoms } from '../../../api/species/kingdoms';
import { Phylums } from '../../../api/species/phylums';


if(Meteor.isClient) {
    Template.kingdom.helpers({

        kingdomNames: () => {
            return Kingdoms.find({});
        }
    });

    Template.kingdom.events ({
        'submit #kingdomForm': function (event, template) {
            event.preventDefault();
            var kingdom = event.target.kingdom.value;
            console.log(kingdom);

            var phylums = Phylums.find().fetch({});
            console.log(phylums);
        }
    });
}