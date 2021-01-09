import './species.html';
import { Template } from 'meteor/templating';
import { Taxonomy } from '/imports/api/taxonomy.js';
import { uploadImage } from '../util.js';
import { loadCountries } from '../util.js';
import { loadStates } from '../util.js';
import { loadCities } from '../util.js';
import { loadTime } from '../util.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

let domain = "";
let kingdom = "";
let phylum = "";
let classes = "";
let order = "";
let family = "";
let genus = "";

let kButton = new ReactiveVar();
let dButton = new ReactiveVar();
let pButton = new ReactiveVar();
let cButton = new ReactiveVar();
let oButton = new ReactiveVar();
let fButton = new ReactiveVar();
let gButton = new ReactiveVar();

let displayDomain = new ReactiveVar("yes");
let kingdomHolder = new ReactiveVar();
let domainHolder = new ReactiveVar();
let phylumHolder = new ReactiveVar();
let classHolder = new ReactiveVar();
let orderHolder = new ReactiveVar();
let familyHolder = new ReactiveVar();
let genusHolder = new ReactiveVar();

let error = new ReactiveVar();
let update = new ReactiveVar();

let chosenCountry = "";
let chosenState = "";
let chosenCity = "";
let chosenEon = "";
let chosenEra = "";
let chosenTime = "";

let dbHolder = new ReactiveArray();
let geoTimeHolder = new ReactiveArray();
let locHolder = new ReactiveArray();
let eonHolder = new ReactiveArray();
let eraHolder = new ReactiveArray();
let timeHolder = new ReactiveArray();
let stateHolder = new ReactiveArray();
let cityHolder = new ReactiveArray();
let locations = new ReactiveArray();
let timeChosen = new ReactiveArray();

if (Meteor.isClient) {

    Tracker.autorun(() => {
        Meteor.subscribe('taxonomy');
    });

    function loadInfo(info, info2, taxLevel, pluralInfo) {
        if (info === "") {
            dbHolder.clear();
            let tempHolderStart = Taxonomy.find().fetch();
            let tempHolderDoms = new Array();

            tempHolderStart.forEach(element => tempHolderDoms.push(element.domains));

            tempHolderDoms.forEach(function (domainValue) {
                domainValue.forEach(function (domain) {
                    dbHolder.push(domain);
                });
            });
        }
        else {
            dbHolder.forEach(function (values) {
                if (values[info] === taxLevel) {
                    let tempHolder = values[pluralInfo];
                    dbHolder.clear();
                    tempHolder.forEach(function (innerValues) {
                        dbHolder.push(innerValues);
                    });
                }
            });
        }

        dbHolder.forEach(function (value) {
            let name = value[info2];
            if (name === "N/A" && !(value.hasOwnProperty('description'))) {
                genusHolder.set("true");
            }
            else {
                genusHolder.set("");
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
            },

            phylumValue: function () {
                return phylumHolder.get();
            },

            classValue: function () {
                return classHolder.get();
            },

            orderValue: function () {
                return orderHolder.get();
            },

            familyValue: function () {
                return familyHolder.get();
            },

            genusValue: function () {
                return genusHolder.get();
            },

            buttonDomain: function () {
                return dButton.get();
            },

            buttonKingdom: function () {
                return kButton.get();
            },

            buttonPhylum: function () {
                return pButton.get();
            },

            buttonClass: function () {
                return cButton.get();
            },

            buttonOrder: function () {
                return oButton.get();
            },

            buttonFamily: function () {
                return fButton.get();
            },

            buttonGenus: function () {
                return gButton.get();
            },

            updateDisplay: function () {
                return update.get();
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
            phylumNames: function () {
                return dbHolder.list();
            },

            kingdomName: function () {
                return kingdom;
            }
        });

        Template.classArea.helpers({
            classNames: function () {
                return dbHolder.list();
            },

            phylumName: function () {
                return phylum;
            }
        });

        Template.orderArea.helpers({
            orderNames: function () {
                return dbHolder.list();
            },

            className: function () {
                return classes;
            }
        });

        Template.familyArea.helpers({
            familyNames: function () {
                return dbHolder.list();
            },

            orderName: function () {
                return order;
            }
        });

        Template.genusArea.helpers({
            genusNames: function () {
                return dbHolder.list();
            },

            familyName: function () {
                return family;
            }
        });

        Template.speciesArea.helpers({
            errorDisplay: function () {
                return error.get();
            },

            timePerChosen: function () {
                return geoTimeHolder.list();
            },

            countryDrop: function () {
                return locHolder.list();
            },

            stateDrop: function () {
                return stateHolder.list();
            },

            cityDrop: function () {
                return cityHolder.list();
            },

            eonDrop: function () {
                return eonHolder.list();
            },

            eraDrop: function () {
                return eraHolder.list();
            },

            timeDrop: function () {
                return timeHolder.list();
            },

            locationPerChosen: function () {
                return locations.list();
            },

            timePerChosen: function () {
                return timeChosen.list();
            }
        });

        Template.species.onCreated(function () {
           loadCountries(locHolder);

            loadInfo("");
            loadTime(eonHolder, "", "", "");
        });

        Template.speciesArea.events({
            "change #country": function (event, template) {
                chosenCountry = template.$("#country").val();
                loadStates(locHolder, chosenCountry, stateHolder);
            },

            "change #region": function (event, template) {
                chosenState = template.$("#region").val();
                loadCities(stateHolder, chosenState, cityHolder);
                
            },

            "change #city": function (event, template) {
                chosenCity = template.$("#city").val();
            },

            "change #eon": function (event, template) {
                eraHolder.clear();
                chosenEon = template.$("#eon").val();
                loadTime(eonHolder, "eon", chosenEon, "eras", eraHolder);
            },

            "change #era": function (event, template) {
                timeHolder.clear();
                chosenEra = template.$("#era").val();
                loadTime(eraHolder, "era", chosenEra, "time_periods", timeHolder);
                
            },

            "change #timePeriod": function (event, template) {
                chosenTime = template.$("#timePeriod").val();
            },

            'submit #formEntry': function (e) {
                e.preventDefault();
                update.set("");
                error.set("");

                let name = e.target.speciesName.value;
                let ext = e.target.extinct.value;
                let desc = e.target.description.value;
                let img = e.target.imageUpload.files;
                let imgArray = new Array();

                if (name === "") {
                    error.set("yes");
                }
                else {
                    error.set();

                    if (img === "") {
                        imgArray.push("s3://geolibrum-assets/species/species/default.png");
                    }
                    else {
                        for (i = 0; i < img.length; i++) {
                            let imageLink = "https://geolibrum-assets.s3.amazonaws.com/species/species/" + img[i].name;
                            let imageName = img[i].name;
                            let imageObject = {
                                name: imageName,
                                link: imageLink
                            }

                            imgArray.push(imageObject);
                            uploadImage(img[i], "species/species/" + img[i].name);
                        }
                    }

                    if (order === "") {
                        order = "N/A";
                    }
                    if (family === "") {
                        family = "N/A";
                    }
                    if (genus === "") {
                        genus = "N/A";
                    }

                    let newSpecies = {
                        createdBy: Meteor.userId(),
                        locations: locations,
                        domain: domain,
                        kingdom: kingdom,
                        phylum: phylum,
                        order: order,
                        family: family,
                        genus: genus,
                        class: classes,
                        species: name,
                        images: imgArray,
                        extinct: ext,
                        description: desc,
                        date_range: timeChosen,
                        count: 0
                    }

                    try {
                        Meteor.call('addSpecies', newSpecies);
                        update.set("Upload successful!");
                    }
                    catch (error) {
                        update.set("Upload failed!");
                    }

                    e.target.reset();
                    geoTimeHolder.clear();
                    locations.clear();
                    stateHolder.clear();
                    cityHolder.clear();

                    displayDomain.set(true);
                    domainHolder.set("");
                    kingdomHolder.set("");
                    phylumHolder.set("");
                    classHolder.set("");
                    orderHolder.set("");
                    familyHolder.set("");
                    genusHolder.set("");

                    domain = "";
                    kingdom = "";
                    phylum = "";
                    order = "";
                    classes = "";
                    family = "";
                    genus = "";


                    dButton.set("");
                    kButton.set("");
                    pButton.set("");
                    cButton.set("");
                    oButton.set("");
                    fButton.set("");
                    gButton.set("");

                    loadInfo("");

                }

            },

            'click .addTime': function () {
                let time = {
                    eon: chosenEon,
                    era: chosenEra,
                    time: chosenTime
                }

                chosenEon = "";
                chosenEra = "";
                chosenTime = "";

                timeHolder.clear();
                eraHolder.clear();
                timeChosen.push(time);
            },

            'click .addLocation': function () {
                let location = {
                    country: chosenCountry,
                    region: chosenState,
                    city: chosenCity
                }

                country = "";
                region = "";
                city = "";

                stateHolder.clear();
                cityHolder.clear();

                locations.push(location);
            },

            'click .deleteTime': function () {
                timeChosen.remove(this);
            },

            'click .deleteLoc': function () {
                locations.remove(this);
            }
        });

        Template.species.events({
            'click .domain': function () {
                displayDomain.set(true);
                domain = "";
                domainHolder.set("");
                kingdomHolder.set("");

                loadInfo("");

                dButton.set("");
            },

            'click .kingdom': function () {
                kingdom = "";
                domainHolder.set(true);
                kingdomHolder.set("");
                phylumHolder.set("");
                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");

                kButton.set("");
                let button = document.getElementById('domainButton');
                button.disabled = false;
            },

            'click .phylum': function () {
                phylum = "";
                kingdomHolder.set(true);
                phylumHolder.set("");
                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");
                loadInfo("kingdom", "phylum", kingdom, "phylums");

                pButton.set("");
                let button = document.getElementById('kingdomButton');
                button.disabled = false;
            },

            'click .class': function () {
                classes = "";
                phylumHolder.set(true);
                classHolder.set("");
                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");
                loadInfo("kingdom", "phylum", kingdom, "phylums");
                loadInfo("phylum", "class", phylum, "classes");

                cButton.set("");
                let button = document.getElementById('phylumButton');
                button.disabled = false;
            },

            'click .order': function () {
                order = "";
                classHolder.set(true);
                orderHolder.set("");

                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");
                loadInfo("kingdom", "phylum", kingdom, "phylums");
                loadInfo("phylum", "class", phylum, "classes");
                loadInfo("class", "order", classes, "orders");

                oButton.set("");
                let button = document.getElementById('classButton');
                button.disabled = false;
            },

            'click .family': function () {
                family = "";
                orderHolder.set(true);
                familyHolder.set("");

                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");
                loadInfo("kingdom", "phylum", kingdom, "phylums");
                loadInfo("phylum", "class", phylum, "classes");
                loadInfo("class", "order", classes, "orders");
                loadInfo("order", "family", order, "families");

                fButton.set("");
                let button = document.getElementById('orderButton');
                button.disabled = false;
            },

            'click .genus': function () {
                genus = "";
                familyHolder.set(true);
                genusHolder.set("");

                dbHolder.clear();

                loadInfo("");
                loadInfo("domain", "kingdom", domain, "kingdoms");
                loadInfo("kingdom", "phylum", kingdom, "phylums");
                loadInfo("phylum", "class", phylum, "classes");
                loadInfo("class", "order", classes, "orders");
                loadInfo("order", "family", order, "families");
                loadInfo("family", "genus", family, "genera");

                gButton.set("");
                let button = document.getElementById('familyButton');
                button.disabled = false;
            },

            'click .select': function (event) {
                if (domain === "") {
                    domain = this.domain;
                    domainHolder.set(true);
                    displayDomain.set("");

                    loadInfo("domain", "kingdom", domain, "kingdoms");

                    dButton.set("true");
                }
                else if (kingdom === "") {
                    kingdom = event.currentTarget.getAttribute("id");
                    domainHolder.set("");
                    kingdomHolder.set(true);

                    loadInfo("kingdom", "phylum", kingdom, "phylums");

                    kButton.set("true");
                    let button = document.getElementById('domainButton');
                    button.disabled = true;
                }
                else if (phylum === "") {
                    phylum = event.currentTarget.getAttribute("id");
                    kingdomHolder.set("");
                    phylumHolder.set(true);

                    loadInfo("phylum", "class", phylum, "classes");

                    let response = genusHolder.get();
                    if (response === 'true') {
                        phylumHolder.set("");
                    }

                    pButton.set("true");
                    let button = document.getElementById('kingdomButton');
                    button.disabled = true;
                }
                else if (classes === "") {
                    classes = event.currentTarget.getAttribute("id");
                    phylumHolder.set("");
                    classHolder.set(true);

                    loadInfo("class", "order", classes, "orders");

                    let response = genusHolder.get();
                    if (response === 'true') {
                        classHolder.set("");
                    }

                    cButton.set("true");
                    let button = document.getElementById('phylumButton');
                    button.disabled = true;
                }
                else if (order === "") {
                    order = event.currentTarget.getAttribute("id");
                    classHolder.set("");
                    orderHolder.set(true);

                    loadInfo("order", "family", order, "families");

                    let response = genusHolder.get();
                    if (response === 'true') {
                        orderHolder.set("");
                    }

                    oButton.set("true");
                    let button = document.getElementById('classButton');
                    button.disabled = true;
                }
                else if (family === "") {
                    family = event.currentTarget.getAttribute("id");
                    orderHolder.set("");
                    familyHolder.set(true);

                    loadInfo("family", "genus", family, "genera");

                    let response = genusHolder.get();
                    if (response === 'true') {
                        familyHolder.set("");
                    }

                    let button = document.getElementById('orderButton');
                    button.disabled = true;
                    fButton.set("true");
                }
                else if (genus === "") {
                    genus = event.currentTarget.getAttribute("id");
                    familyHolder.set("");
                    genusHolder.set(true);

                    gButton.set("true");
                    let button = document.getElementById('familyButton');
                    button.disabled = true;
                }
            }
        });
    }
}
