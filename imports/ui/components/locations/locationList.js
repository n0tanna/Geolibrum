import './locationList.html';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '/imports/api/location/methods.js';


if (Meteor.isClient) {
    const status = new ReactiveVar("No locations.");
    var locations = new ReactiveArray();

    Meteor.call("getCount", function(error, result) {
        if (error) {
          console.log("Error: " + error.reason)
        } else {
          console.log(result);
          if(result > 0) {
              status.set(null);

              Meteor.call("getLocations", function(error, result) {
                if (error) {
                  console.log("Error: " + error.reason)
                } else {
                  locations = result;
                }
              });
          }
        }
      });

    Template.locationList.helpers({
        statusDisplay: function () {
            return status.get();
        },
        display: function () {
            return locations.list();
        }
    });
}