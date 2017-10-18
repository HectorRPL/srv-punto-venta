/**
 * Created by Héctor on 18/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {PieChart} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('pieChart.todos', function () {

        console.log(PieChart.find().fetch());
        return PieChart.find();

    });
}
