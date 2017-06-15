/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Tiendas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tiendas.todas', function () {

        return Tiendas.find();
    });

    Meteor.publish('tiendas.seleccionada', function (tiendaId) {

        return Tiendas.find(tiendaId);
    });

}