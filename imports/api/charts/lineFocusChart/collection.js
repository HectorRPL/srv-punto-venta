/**
 * Created by Héctor on 18/10/2017.
 */
import {Mongo} from "meteor/mongo";
export const LineFocusChart = new Mongo.Collection('lineFocusChart');

LineFocusChart.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.lineFocusChart = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    key:{
        type: String
    },
    values: {
        type: [Object],
        blackbox:true,
        optional: true
    }
});

LineFocusChart.attachSchema(Schema.lineFocusChart);