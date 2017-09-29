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

export const actualizarDirccnEntrg = new ValidatedMethod({
    name: 'ordenesVentas.actualizarDirccnEntrg',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarDirccnEntrg',
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

export const actualizarQuitrDirccn = new ValidatedMethod({
    name: 'ordenesVentas.actualizarQuitrDirccn',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarQuitrDirccn',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId}) {
        if (Meteor.isServer) {
            return VentasOrdenes.update({ventaId: ventaId}, {$unset: {direccionEntregaId: ''}}, {multi: true}, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
                }
            });
        }
    }
});

export const actualizarVentDatsFiscls = new ValidatedMethod({
    name: 'ordenesVentas.actualizarVentDatsFiscls',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.actualizarVentDatsFiscls',
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

export const actualizarQuitrDatsFiscls = new ValidatedMethod({
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
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId}) {
        if (Meteor.isServer) {
            return VentasOrdenes.update({ventaId: ventaId},
                {$unset: {datosFiscalesId: ''}}, {multi: true}, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
                }
            });
        }
    }

});

const ORDENES_VENTAS_METHODS = _.pluck(
    [
        actualizarVentaCliente,
        actualizarDirccnEntrg,
        actualizarVentDatsFiscls,
        actualizarQuitrDirccn,
        actualizarQuitrDatsFiscls

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