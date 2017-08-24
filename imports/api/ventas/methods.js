/**
 * Created by jvltmtz on 19/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {Empleados} from '../../api/empleados/collection';
import {Ventas} from './collection'
import {VentasOrdenes} from './ordenes/collection'
import {_} from "meteor/underscore";
const TIPO_VENTA = 'MENUDEO';

var pedidoSchema = new SimpleSchema({
    pedido: {type: [Object], blackbox: true},
    numMeses: {type: [String], blackbox: true, optional: true}
});

export const altaVenta = new ValidatedMethod({
    name: 'ventas.altaVenta',
    mixins: [PermissionsMixin, CallPromiseMixin],
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
        mesesIntereses: {type: pedidoSchema, optional: true},
        iva: {type: Number}
    }).validator(),
    run({otraFormaPago, mesesIntereses, tiendaId, total, subTotal, importeIva, iva}) {
        let ventaId = '';
        let ordenesMeses = new Map();

        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            ventaId = VentasMenudeoOp.altaVenta(tiendaId, empleado._id);

            //Crea las ordenes de venta para meses sin intereses
            if (mesesIntereses.pedido.length > 0) {
                for (let i = 0; i < mesesIntereses.numMeses.length; i++) {
                    const noMes = mesesIntereses.numMeses[i];
                    let resultOrdenId = VentasMenudeoOp.altaOrdenVenta(ventaId, tiendaId, noMes, iva);
                    const ordenFinal = {
                        ventaOrdenId: resultOrdenId,
                        subTotal: 0
                    };
                    ordenesMeses.set(noMes, ordenFinal);
                }

                for (let j = 0; j < mesesIntereses.pedido.length; j++) {
                    let pedido = mesesIntereses.pedido[j];
                    let ordenResult = ordenesMeses.get(pedido.mesesSinInteres);
                    ordenResult.subTotal += (pedido.total * pedido.precioFinal);
                    ordenesMeses.set(pedido.mesesSinInteres, ordenResult);
                    pedido.ventaOrdenId = ordenResult.ventaOrdenId;

                    VentasMenudeoOp.crearPartida(pedido, ventaId);
                }
            }

            ordenesMeses.forEach((value, key, map)=> {
                const total = value.subTotal * (1 + (iva / 100));
                VentasOrdenes.update({_id: value.ventaOrdenId},
                    {
                        $set: {
                            total: total,
                            saldoCobrar: total,
                            subTotal: value.subTotal
                        }
                    }
                );
            });

            let otraPagoSubtotal = 0;
            let resultId = '';
            //Crear las ordenes de venta para otra forma de pago
            if (otraFormaPago.pedido.length > 0) {
                console.log('Otr forma de pago ');
                resultId = VentasMenudeoOp.altaOrdenVenta(ventaId, tiendaId, 0, iva);

                for (let k = 0; k < otraFormaPago.pedido.length; k++) {
                    let pedido = otraFormaPago.pedido[k];
                    otraPagoSubtotal += (pedido.total * pedido.precioFinal);
                    pedido.ventaOrdenId = resultId;
                    VentasMenudeoOp.crearPartida(pedido, ventaId);
                }
                const total = otraPagoSubtotal * (1 + (iva / 100));
                VentasOrdenes.update({_id: resultId}, {$set: {total: total, subTotal: otraPagoSubtotal}});
            }

            return ventaId;
        }
    }
});

export const asignarClienteVnt = new ValidatedMethod({
    name: 'ventas.asignarClienteVnt',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventas.asignarClienteVnt',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
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
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventas.asignarDireccionEntregaVnt',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
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

export const asignarDatosFiscalesVnt = new ValidatedMethod({
    name: 'ventas.asignarDatosFiscalesVnt',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventas.asignarDatosFiscalesVnt',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        datosFiscalesId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, datosFiscalesId}) {

        return Ventas.update({_id: ventaId}, {$set: {datosFiscalesId: datosFiscalesId}}, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
            }
        });
    }
});

export const asignarNoVentas = new ValidatedMethod({
    name: 'ventas.asignarNoVentas',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventas.asignarNoVentas',
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
        altaVenta,
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
