/**
 * Created by Héctor on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Inventarios} from "../collection";

if (Meteor.isServer) {
    // Trae t.o.d.o. el inventario
    Meteor.publish('inventarios.todo', function () {
        return Inventarios.find();
    });

}