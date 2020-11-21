import { Template } from 'meteor/templating';
import popper from 'popper.js'

global.Popper = global.Popper || popper

Meteor.startup(function () {
    GoogleMaps.load({ key: Meteor.settings.public.googleAPI });
});