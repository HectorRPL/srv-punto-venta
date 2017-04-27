/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Marcas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('marcas.todo', function () {
        return Marcas.find();
    });
}