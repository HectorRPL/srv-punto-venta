/**
 * Created by Héctor on 18/10/2017.
 */
import {Mongo} from "meteor/mongo";
export const PieChart = new Mongo.Collection('pieChart');

PieChart.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.pieChart = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    key: {type: String, optional: true},
      y: {type: Number, optional: true}
});

PieChart.attachSchema(Schema.pieChart);