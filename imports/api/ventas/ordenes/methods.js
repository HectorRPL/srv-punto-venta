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
import {Empleados} from "../../empleados/collection";

export const crearVentaOrden = new ValidatedMethod({
    name: 'ordenesVentas.crearVentaOrden',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ordenesVentas.crearVentaOrden',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
        mesesSinInteres: {type: Number, optional: true},
        tipo: {type: String}
    }).validator(),
    run({ventaId, tiendaId, clienteId, mesesSinInteres, tipo}) {

        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: this.userId});
            const orden = {
                ventaId: ventaId,
                clienteId: clienteId,
                tiendaId: tiendaId,
                tipo: tipo,
                empleadoId: empleado._id
            };

            if (mesesSinInteres > 0) {
                orden.mesesSinInteres = mesesSinInteres;
            }

            return VentasOrdenes.insert(orden, (err) => {
                if (err) {
                    throw new Meteor.Error(403, err.message, err.reason);
                }

            });
        }
    }

});


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
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, clienteId}) {
        if (Meteor.isServer) {

            VentasOrdenes.remove({ventaId: ventaId, numTotalProductos: 0});
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
        message: () => {
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
                    throw new Meteor.Error(500, 'Error al realizar la operaci??n.', 'cliente-no-creado');
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
        message: () => {
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
                    throw new Meteor.Error(500, 'Error al realizar la operaci??n.', 'cliente-no-creado');
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
        message: () => {
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
                    throw new Meteor.Error(500, 'Error al realizar la operaci??n.', 'cliente-no-creado');
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
        message: () => {
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
                        console.log(err);
                        throw new Meteor.Error(500, 'Error al realizar la operaci??n.', 'cliente-no-creado');
                    }
                });
        }
    }
});


const ORDENES_VENTAS_METHODS = _.pluck(
    [
        crearVentaOrden,
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