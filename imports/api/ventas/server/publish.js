/**
 * Created by jvltmtz on 25/07/17.
 */
import {Ventas} from "../collection";
import {VentasOrdenes} from "../ordenes/collection";

if (Meteor.isServer) {

    Meteor.publish('ventas.id', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            Counts.publish(this, 'venta.total',
                VentasOrdenes.find({ventaId: filter._id}, {fields: {_id: 1, total: 1}}),
                {
                    noReady: true, countFromField: 'total'
                });
            Counts.publish(this, 'venta.subTotal',
                VentasOrdenes.find({ventaId: filter._id}, {fields: {_id: 1, subTotal: 1}}),
                {
                    noReady: true, countFromField: 'subTotal'
                });
            return Ventas.find(filter, options);
        }
    });

}
