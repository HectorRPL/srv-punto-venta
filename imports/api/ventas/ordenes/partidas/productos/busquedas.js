/**
 * Created by jvltmtz on 24/08/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {VentasOrdenes} from "../../../ordenes/collection";
import {VentasProductosPartidas} from "./collection";

export const buscarVentasProductosPartidas = new ValidatedMethod({
    name: 'ventasProductosPartidas.buscarVentasProductosPartidas',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        codigo: {type: String}
    }).validator(),
    run({tiendaId, codigo}) {
        let selector = {tiendaId: tiendaId, noOrden: codigo};
        let options = {fields: {_id: 1, tiendaId: 1, noOrden: 1}, limit: 10};
        const resultado = VentasOrdenes.find(selector, options).fetch();
        return resultado;
    }
});

export const buscarCantidaAlmacen = new ValidatedMethod({
    name: 'ventasProductosPartidas.buscarCantidaAlmacen',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        proveedorId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({partidaId, proveedorId}) {
        if (Meteor.isServer) {
            const selector = {partidaId: partidaId, tiendaProveedorId: proveedorId};
            const producto = VentasProductosPartidas.findOne(selector);
            return producto ? producto.numProductos : 0;
        }

    }
});

const BUSQUEDAS_VENTAS_PRODUCTOS_PARTIDAS_METHODS = _.pluck(
    [
        buscarVentasProductosPartidas,
        buscarCantidaAlmacen
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_VENTAS_PRODUCTOS_PARTIDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
