/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Clientes} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('clientes.todo', function () {
        return Clientes.find();
    });
}