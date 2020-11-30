import { Mongo } from 'meteor/mongo';

const dm = new Mongo.Collection('domains');

const dmCount = dm.find().count();

if(dmCount === 0) {
    dm.insert({
        domain: "Archaea"
        
    });

    dm.insert({
        domain: "Bacteria"
    });

    dm.insert({
        domain: "Eukarya"
    });
}

export { dm as Domains }