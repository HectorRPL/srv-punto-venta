/**
 * Created by jvltmtz on 18/09/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasSaldos} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('ventasSaldos.ventaOrdenId', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            return VentasSaldos.find(filter, {fields: {fechaCreacion: 0}});
        }
    });

}