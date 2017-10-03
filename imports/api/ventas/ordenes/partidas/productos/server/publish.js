/**
 * Created by Juan V. on 02/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {VentasProductosPartidas} from "../collection";


if (Meteor.isServer) {
    Meteor.publish('ventasProductosPartidas.MiInventario', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const andFilter = {$and: [filter, {deMiInventario: true}]};
            return VentasProductosPartidas.find(andFilter, {options: {numProductos: 1}});
        }
    });

}
