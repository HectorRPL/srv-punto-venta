import {Meteor} from "meteor/meteor";
import {CumulativeChart} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('cumulativeChart.todos', function () {
        return CumulativeChart.find();

    });
}