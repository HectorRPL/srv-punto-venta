/**
 * Created by jvltmtz on 6/06/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {VentasOrdenes} from "./collection";
import {_} from "meteor/underscore";


export const asignarClienteVnt = new ValidatedMethod({
    name: 'ordenesVentas.asignarClienteVnt',
    /*


    TODO: Algunos archivos no tienen implementado o no está importado el PermissionsMixin,

    */
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.asignarClienteVnt',
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

export const asignarDireccionEntregaVnt = new ValidatedMethod({
    name: 'ordenesVentas.asignarDireccionEntregaVnt',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.asignarDireccionEntregaVnt',
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

export const asignarDatosFiscalesVnt = new ValidatedMethod({
    name: 'ordenesVentas.asignarDatosFiscalesVnt',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.asignarDatosFiscalesVnt',
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

export const asignarNoVentas = new ValidatedMethod({
    name: 'ordenesVentas.asignarNoVentas',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.asignarNoVentas',
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
        asignarClienteVnt,
        asignarDireccionEntregaVnt,
        asignarDatosFiscalesVnt,
        asignarNoVentas

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