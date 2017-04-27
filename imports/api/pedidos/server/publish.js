/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Pedidos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('pedidos.todo', function () {
        return Pedidos.find();
    });
}