/**
 * Created by jvltmtz on 25/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {VentasPartidasOrdenes} from "./collection";
import {_} from "meteor/underscore";

const CAMPOS_VENTAS_PARTIDAS = [
    'ventaId', 'ventaOrdenId', 'productoId', 'factorId',
    'precioBase', 'precioFinal', 'descuento', 'numProductos', 'iva'
];

export const crearPartidaOrden = new ValidatedMethod({
    name: 'partidasOrdenes.crearPartidaOrden',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'partidasOrdenes.crearPartidaOrden',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasPartidasOrdenes.simpleSchema()
        .pick(CAMPOS_VENTAS_PARTIDAS)
        .validator({
            clean: true,
            filter: false
        }),
    run({
            ventaId, ventaOrdenId, productoId, factorId, precioBase,
            precioFinal, descuento, numProductos, iva
        }) {

        if (Meteor.isServer) {

            const partidaFinal = {
                ventaId,
                ventaOrdenId,
                productoId,
                factorId,
                precioBase,
                precioFinal,
                descuento,
                numProductos,
                iva
            };

            return VentasPartidasOrdenes.insert(partidaFinal, (err) => {
                if (err) {
                    console.log('Error al crear la partida ', partidaId, ventaOrdenId, err);
                }
            });
        }
    }

});

export const borrarPartidaOrden = new ValidatedMethod({
    name: 'partidasOrdenes.borrarPartidaOrden',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'partidasOrdenes.borrarPartidaOrden',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasPartidasOrdenes.simpleSchema()
        .pick(['_id'])
        .validator({
            clean: true,
            filter: false
        }),
    run({
            _id
        }) {

        if (Meteor.isServer) {

            return VentasPartidasOrdenes.remove({_id: _id}, (err) => {
                if (err) {
                    console.log('Error al crear la partida ', partidaId, ventaOrdenId, err);
                }
            });
        }
    }

});

const VENTAS_PARTIDAS_METHODS = _.pluck(
    [
        crearPartidaOrden,
        borrarPartidaOrden

    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(VENTAS_PARTIDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}