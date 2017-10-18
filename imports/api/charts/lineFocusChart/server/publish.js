import {Meteor} from "meteor/meteor";
import {LineFocusChart} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('lineFocusChart.todos', function () {

        return LineFocusChart.find();

    });
}