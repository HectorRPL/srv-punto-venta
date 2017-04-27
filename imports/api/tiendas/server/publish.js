/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Tiendas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tiendas.todo', function () {
        return Tiendas.find();
    });
}