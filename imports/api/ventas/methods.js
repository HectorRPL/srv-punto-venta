/**
 * Created by jvltmtz on 19/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {Ventas} from './collection'
import {_} from "meteor/underscore";
const TIPO_VENTA = 'MENUDEO';

var pedidoSchema = new SimpleSchema({
    pedido: {type: [Object], blackbox: true},
    numMeses: {type: [String], blackbox: true, optional: true}
});

export const altaVenta = new ValidatedMethod({
    name: 'ventas.altaVenta',
    mixins: [PermissionsMixin,CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventas.altaVenta',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        total: {type: Number, decimal: true},
        subTotal: {type: Number, decimal: true},
        importeIva: {type: Number, decimal: true},
        otraFormaPago: {type: pedidoSchema, optional: true},
        mesesIntereses: {type: pedidoSchema, optional: true}
    }).validator(),
    run({otraFormaPago, mesesIntereses, tiendaId, total, subTotal, importeIva}) {
        let ventaId = '';
        let ordenesVentas = [];

        if (Meteor.isServer) {
            ventaId = VentasMenudeoOp.altaVenta(tiendaId, total, subTotal, importeIva, Meteor.userId());

            //Crea las ordenes de venta para meses sin intereses
            if (otraFormaPago.pedido.length  > 0) {
                mesesIntereses.numMeses.forEach((item)=> {
                    let resultOrdenId = VentasMenudeoOp.altaOrdenVenta(ventaId, tiendaId, item);
                    const ordenesMeses = {
                        numMeses: item,
                        ordenId: resultOrdenId
                    };
                    ordenesVentas.push(ordenesMeses);
                });
                mesesIntereses.pedido.forEach((item)=> {
                    const ordenIdTemp = ordenesVentas.find((orden)=> {
                        return orden.numMeses === item.mesesSinInteres;
                    });
                    VentasMenudeoOp.crearPartida(item, ordenIdTemp.ordenId, ventaId);
                });
            }

            //Crear las ordenes de venta para otra forma de pago
            if (otraFormaPago.pedido.length > 0) {
                let resultId = VentasMenudeoOp.altaOrdenVenta(ventaId, tiendaId, 0);
                otraFormaPago.pedido.forEach((item)=> {
                    VentasMenudeoOp.crearPartida(item, resultId, ventaId);
                });
            }
            return ventaId;
        }
    }
});

export const asignarClienteVnt = new ValidatedMethod({
    name: 'ventas.asignarClienteVnt',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, clienteId}) {
        return Ventas.update({_id: ventaId}, {$set: {clienteId: clienteId}});
    }

});

export const asignarDireccionEntregaVnt = new ValidatedMethod({
    name: 'ventas.asignarDireccionEntregaVnt',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        direccionId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, direccionId}) {

        return Ventas.update({_id: ventaId}, {$set: {direccionEntregaId: direccionId}}, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
            }
        });
    }

});

const ORDENES_VENTAS_METHODS = _.pluck(
    [
        altaVenta,
        asignarClienteVnt,
        asignarDireccionEntregaVnt
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
