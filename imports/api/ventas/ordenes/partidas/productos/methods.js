import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {VentasProductosPartidas} from "./collection";
import {_} from "meteor/underscore";
import {ProductosInventarios} from "../../../../inventarios/productosInventarios/collection";

export const crearProductosPartida = new ValidatedMethod({
    name: 'ventasProductosPartidas.crearProductosPartida',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventasProductosPartidas.crearProductosPartida',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        tiendaOrigenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        productos: {type: [Object], blackbox: true}
    }).validator(),
    run({
            tiendaOrigenId, partidaId, ventaOrdenId, productos
        }) {

        if (Meteor.isServer) {

            productos.forEach((prod) => {
                if (prod.cantidadSolicitada > 0) {
                    const producto = {
                        partidaId: partidaId,
                        ventaOrdenId: ventaOrdenId,
                        productoInventarioId: prod._id,
                        numProductos: prod.cantidadSolicitada
                    };
                    if (prod.tiendaId) {
                        producto.tiendaProveedorId = prod.tiendaId
                    }

                    VentasProductosPartidas.insert(producto, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }


            });


        }
    }

});

export const actualizarProdtsMiInvt = new ValidatedMethod({
    name: 'ventasProductosPartidas.actualizarProdtsMiInvt',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['impr_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventasProductosPartidas.actualizarProdtsMiInvt',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasProductosPartidas.simpleSchema().pick(['ventaOrdenId']).validator({
        clean: true,
        filter: false
    }),
    run({ventaOrdenId}) {
        if (Meteor.isServer) {

            VentasProductosPartidas.update({ventaOrdenId: ventaOrdenId},
                {$set: {descontado: true}}, {multi: true},
                (err) => {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'producto-no-descontado');
                    }
                });
        }
    }

});

export const actualizarComprOrdnId = new ValidatedMethod({
    name: 'ventasProductosPartidas.actualizarComprOrdnId',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventasProductosPartidas.actualizarComprOrdnId',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasProductosPartidas.simpleSchema().pick(['_id', 'compraOrdenId']).validator({
        clean: true,
        filter: false
    }),
    run({_id, compraOrdenId}) {
        if (Meteor.isServer) {

            VentasProductosPartidas.update({_id: _id},
                {$set: {compraOrdenId: compraOrdenId}},
                (err) => {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'producto-no-descontado');
                    }
                });
        }
    }

});


const VENTAS_PRODUCTOS_PARTIDAS = _.pluck(
    [
        actualizarProdtsMiInvt,
        actualizarComprOrdnId,
        crearProductosPartida

    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(VENTAS_PRODUCTOS_PARTIDAS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}