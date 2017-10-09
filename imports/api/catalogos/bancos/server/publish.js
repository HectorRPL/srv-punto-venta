/**
 * Created by Héctor on 09/09/2017.
 */
import {Meteor} from "meteor/meteor";
import {Bancos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('bancos.todos', function (filter) {

        return Bancos.find(filter);

    });
}