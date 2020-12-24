import { Template } from 'meteor/templating';
import popper from 'popper.js'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

global.Popper = global.Popper || popper

Meteor.startup(function () {
    GoogleMaps.load({ key: Meteor.settings.public.googleAPI });
});

export function uploadImage(image, directory) {
    AWS.config.update({
        accessKeyId: Meteor.settings.public.AWSAccessKeyId,
        secretAccessKey: Meteor.settings.public.AWSSecretAccessKey
    });

    const params = {
        Bucket: Meteor.settings.public.S3Bucket,
        Key: directory,
        Body: image
    };

    s3.upload(params, function (err, data) {
        if (err) throw err;
        console.log(`File uploaded successfully at ${data.Location}`);
    });
}

export function deleteImage(imageURL) {
    const params = {
        Bucket: Meteor.settings.public.AWSAccessKeyId,
        Key: imageURL
    };

    s3.deleteObject(params,function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });

}

export function formatDate() {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) {
        return year + '-' + month + '-' + '0' + day;
    }
    else if (month < 10) {
        return year + '-' + '0' + month + '-' + day;
    }
    else if (day < 10 && month < 10) {
        return year + '-' + '0' + month + '-' + '0' + day;
    }
    else {
        return year + '-' + month + '-' + day;
    }
}