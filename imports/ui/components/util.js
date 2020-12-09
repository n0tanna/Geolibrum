import { Template } from 'meteor/templating';
import popper from 'popper.js'

global.Popper = global.Popper || popper

Meteor.startup(function () {
    GoogleMaps.load({ key: Meteor.settings.public.googleAPI });
});

export function formatDate() {
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (day < 10) {
        return year + '-' + month + '-' + '0' + day;
    }
    else if (month < 10) {
        return year + '-' + '0' + month + '-' + day;
    }
    else if (day < 10 && month < 10) {
        return year + '-' + '0' + month + '-'+ '0' + day;
    }
    else {
        return year + '-' + month + '-' + day;
    }
}