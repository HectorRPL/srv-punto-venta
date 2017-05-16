/**
 * Created by Héctor on 16/05/2017.
 */
import {Meteor} from "meteor/meteor";
import {Bancos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('bancos.todos', function (filter) {

        return Bancos.find(filter);

    });
}