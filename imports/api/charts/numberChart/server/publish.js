/**
 * Created by Héctor on 18/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {NumberChart} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('numberChart.todos', function (filter) {

        return NumberChart.find(filter);

    });
}
