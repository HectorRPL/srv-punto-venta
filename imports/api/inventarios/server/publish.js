/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Inventarios} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('inventarios.todo', function () {
        return Inventarios.find();
    });
}