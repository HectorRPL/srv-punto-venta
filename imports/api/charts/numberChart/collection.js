/**
 * Created by Héctor on 18/10/2017.
 */
import {Mongo} from "meteor/mongo";
export const NumberChart = new Mongo.Collection('numberChart');

NumberChart.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.numberChart = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    numero1: {
        type: Number,
        optional: true
    },
    numero2: {
        type: Number,
        optional: true
    },
    numero3: {
        type: Number,
        optional: true
    },
    numero4: {
        type: Number,
        optional: true
    },
    numero5: {
        type: Number,
        optional: true
    },
    numero6: {
        type: Number,
        optional: true
    },
    numero7: {
        type: Number,
        optional: true
    },
    numero8: {
        type: Number,
        optional: true
    },
    numero9: {
        type: Number,
        optional: true
    },
    numero10: {
        type: Number,
        optional: true
    }
});

NumberChart.attachSchema(Schema.numberChart);