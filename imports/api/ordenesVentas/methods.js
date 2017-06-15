/**
 * Created by jvltmtz on 6/06/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {OrdenesVentas} from './collection'
import {_} from "meteor/underscore";

var pedidoSchema = new SimpleSchema({
    total: {type: Number, decimal: true},
    subTotal: {type: Number, decimal: true},
    importeIva: {type: Number, decimal: true},
    pedido: {type: [Object], blackbox: true}
});


export const crearOrdenVenta = new ValidatedMethod({
    name: 'ordenesVenta.crear',
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        otraFormaPago: {type: pedidoSchema, optional: true},
        mesesIntereses: {type: pedidoSchema, optional: true}
    }).validator(),
    run({otraFormaPago, mesesIntereses, tiendaId}) {

        if (Meteor.isServer) {
            let ids = {
                ordenMesesId: '',
                ordenOtraFormaId: ''
            };

            if (otraFormaPago.total > 0) {
                ids.ordenOtraFormaId = OrdenesVentasOp.crearOrdenVenta(tiendaId, otraFormaPago, false);
            }

            if (mesesIntereses.total > 0) {
                ids.ordenMesesId = OrdenesVentasOp.crearOrdenVenta(tiendaId, mesesIntereses, true);
            }

            return ids;
        }


    }
});

export const actualizarCliente = new ValidatedMethod({
    name: 'ordenesVenta.actualizarCliente',
    validate: new SimpleSchema({
        ordenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ordenId, clienteId}) {

        return OrdenesVentas.update({_id: ordenId}, {$set: {clienteId: clienteId}});
    }

});

export const actualizarDireccionEntrega = new ValidatedMethod({
    name: 'ordenesVenta.actualizarDireccionEntrega',
    validate: new SimpleSchema({
        ordenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        direccionId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ordenId, direccionId}) {

        return OrdenesVentas.update({_id: ordenId}, {$set: {direccionEntregaId: direccionId}});
    }

});

const ORDENES_VENTAS_METHODS = _.pluck(
    [
        crearOrdenVenta,
        actualizarCliente,
        actualizarDireccionEntrega
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(ORDENES_VENTAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}