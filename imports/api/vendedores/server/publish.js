/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Vendedores} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('vendedores.todo', function () {
        return Vendedores.find();
    });
}