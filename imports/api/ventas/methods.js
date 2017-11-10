/**
 * Created by jvltmtz on 19/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {Empleados} from "../../api/empleados/collection";
import {Ventas} from "./collection";
import {VentasOrdenes} from "./ordenes/collection";
import {_} from "meteor/underscore";

const TIPO_VENTA = 'MENUDEO';


export const crearVenta = new ValidatedMethod({
    name: 'ventas.crearVenta',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventas.crearVenta',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id},
        pedido: {type: [Object], blackbox: true},
        numTickets: {type: [String], blackbox: true, optional: true},
        iva: {type: Number},
        tipo: {type: String}
    }).validator(),
    run({
            tiendaId, clienteId, pedido, numTickets, iva, tipo
        }) {
        let ventaId = '';
        let ticketsIds = new Map();
        if (Meteor.isServer) {
            try {
                const empleado = Empleados.findOne({propietarioId: this.userId});
                ventaId = VentasOperaciones.altaVenta(tiendaId);

                for (let i = 0; i < numTickets.length; i++) {
                    const numTicket = numTickets[i];
                    const ventaOrdenId = VentasOperaciones.altaOrdenVenta(ventaId, tiendaId, numTicket,
                        empleado._id, clienteId, tipo);

                    ticketsIds.set(numTicket, ventaOrdenId);
                }

                for (let j = 0; j < pedido.length; j++) {

                    let partida = pedido[j];
                    const ordenId = ticketsIds.get(partida.mesesSinInteres);

                    let partidaId = VentasOperaciones.crearPartida(partida, ventaId,
                        ordenId, clienteId, iva);

                    for (let j = 0; j < partida.tiendas.length; j++) {
                        let item = partida.tiendas[j];
                        VentasOperaciones.crearProdcutosPartidas(item, ordenId, partidaId, tiendaId);
                    }
                }

            } catch (err) {
                console.log('############ ', err);
                throw err;
            }
            return ventaId;
        }
    }
});

export const actualizarNumVentaOrden = new ValidatedMethod({
    name: 'ventas.actualizarNumVentaOrden',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventas.actualizarNumVentaOrden',
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
            try{
                VentasOperaciones.actualiazarNoVenta(ventaId, tiendaId);
            } catch(e){
                throw e;
            }
        }
    }
});

export const crearVentaTinda = new ValidatedMethod({
    name: 'ventas.crearVentaTinda',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_ordenes_tienda'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventas.crearVentaTinda',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        clienteId: {type: String, regEx: SimpleSchema.RegEx.Id},
        total: {type: Number, decimal: true},
        subTotal: {type: Number, decimal: true},
        importeIva: {type: Number, decimal: true},
        iva: {type: Number},
        pedido: {type: [Object], blackbox: true}
    }).validator(),
    run({pedido, tiendaId, clienteId, total, subTotal, importeIva, iva}) {
        if (Meteor.isServer) {
            let otraPagoSubtotal = 0;
            let resultId = '';

            let ventaId = VentasOperaciones.altaVenta(tiendaId);
            const empleado = Empleados.findOne({propietarioId: this.userId});
            if (pedido.length > 0) {
                resultId = VentasOperaciones.altaOrdenVenta(ventaId, tiendaId, 0, empleado._id, clienteId);

                for (let k = 0; k < pedido.length; k++) {
                    let pedido = pedido[k];
                    otraPagoSubtotal += (pedido.total * pedido.precioFinal);
                    pedido.ventaOrdenId = resultId;
                    VentasOperaciones.crearPartida(pedido, ventaId, tiendaId, clienteId);
                }
                const total = otraPagoSubtotal * (1 + (iva / 100));

                VentasSaldos.insert({
                    ventaOrdenId: resultId,
                    tiendaId: tiendaId,
                    clienteId: clienteId,
                    total: total,
                    saldoCobrar: total,
                    subTotal: otraPagoSubtotal
                });
            }

            return ventaId;

        }

    }
});


const ORDENES_VENTAS_METHODS = _.pluck(
    [
        crearVenta,
        actualizarNumVentaOrden
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
