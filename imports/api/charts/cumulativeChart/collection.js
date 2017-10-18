import {Mongo} from "meteor/mongo";
export const CumulativeChart = new Mongo.Collection('cumulativeChart');

CumulativeChart.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.cumulativeChart = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    key:{
        type: String
    },
    color:{
        type: String,
        optional: true
    },
    mean:{
        type: Number,
        optional: true
    },
    values: {
        type: [[]],
        optional: true
    }
});

CumulativeChart.attachSchema(Schema.cumulativeChart);