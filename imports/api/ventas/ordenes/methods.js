/**
 * Created by jvltmtz on 6/06/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {VentasOrdenes} from "./collection";
import {_} from "meteor/underscore";


export const actualizarVentaCliente = new ValidatedMethod({
    name: 'ordenesVentas.actualizarVentaCliente',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarVentaCliente',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, clienteId}) {
        if (Meteor.isServer) {
            return VentasOrdenes.update({ventaId: ventaId}, {$set: {clienteId: clienteId}}, {multi: true});
        }
    }

});

export const actualizarVentaDireccionEntrega = new ValidatedMethod({
    name: 'ordenesVentas.actualizarVentaDireccionEntrega',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarVentaDireccionEntrega',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        direccionId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, direccionId}) {
        if (Meteor.isServer) {
            return VentasOrdenes.update({ventaId: ventaId}, {$set: {direccionEntregaId: direccionId}}, {multi: true}, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
                }
            });
        }
    }
});

export const actualizarVentaDatosFiscales = new ValidatedMethod({
    name: 'ordenesVentas.actualizarVentaDatosFiscales',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarVentaDatosFiscales',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        datosFiscalesId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, datosFiscalesId}) {
        if (Meteor.isServer) {
            return VentasOrdenes.update({ventaId: ventaId}, {$set: {datosFiscalesId: datosFiscalesId}}, {multi: true}, (err) => {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
                    }
                });
        }
    }
});

export const actualizarVentaNumero = new ValidatedMethod({
    name: 'ordenesVentas.actualizarVentaNumero',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarVentaNumero',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, tiendaId}) {

        if (Meteor.isServer) {
            VentasMenudeoOp.actualiazarNoVenta(ventaId, tiendaId);
        }
    }

});


const ORDENES_VENTAS_METHODS = _.pluck(
    [
        actualizarVentaCliente,
        actualizarVentaDireccionEntrega,
        actualizarVentaDatosFiscales,
        actualizarVentaNumero

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