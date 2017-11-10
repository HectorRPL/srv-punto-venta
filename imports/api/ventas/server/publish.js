/**
 * Created by jvltmtz on 25/07/17.
 */
import {Ventas} from "../collection";
import {VentasOrdenes} from "../ordenes/collection";
import {_} from "meteor/underscore";
import {VentasEntregas} from "../entregas/collection";

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

    Meteor.publish('ventas.count.totalProductos', function (filter) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;

            Counts.publish(this, 'ventaNumTotalProductos', VentasOrdenes.find(selector),
                {countFromField: 'numTotalProductos'}, {noReady: false}
            );
        }
    });

    Meteor.publish('ventas.count.totalEntregas', function (filter) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const ventasOrdenes = VentasOrdenes.find({ventaId: filter.ventaId}, {fields: {_id: 1}}).fetch();

            const selector = {ventaOrdenId: {$in: _.pluck(ventasOrdenes, '_id')}};
            Counts.publish(this, 'ventaNumTotalEntregas', VentasEntregas.find(selector),
                {countFromField: 'numProductos'}, {noReady: false}
            );
        }
    });


    Meteor.publish('ventas.count.ventasTickets', function (filter) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            Counts.publish(this, 'numVentasTickets', VentasOrdenes.find(selector),
                {noReady: false}
            );
        }
    });



}
