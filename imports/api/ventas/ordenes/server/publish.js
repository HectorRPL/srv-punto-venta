/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasOrdenes} from "../collection";
import {VentasPartidasOrdenes} from "../partidas/collection";

if (Meteor.isServer) {

    Meteor.publish('ventasOrdenes.id', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            const options = {fields: {fechaCreacion: 0}};
            return VentasOrdenes.find(selector, options);
        }
    });
}
