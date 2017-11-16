/**
 * Created by Héctor on 15/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {VentasOrdenes} from "./collection";

export const buscarVentasOrdenes = new ValidatedMethod({
    name: 'ventasOrdenes.buscarVentasOrdenes',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String},
        codigo: {type: String}
    }).validator(),
    run({tiendaId, codigo}) {
        let selector = {tiendaId: tiendaId, numVentaOrden: codigo};
        let options = {fields: {_id: 1, tiendaId: 1, numVentaOrden: 1}, limit: 10};
        const resultado = VentasOrdenes.find(selector, options).fetch();
        return resultado;
    }
});


export const obtenerSaldoPorCobrar = new ValidatedMethod({
    name: 'ventasOrdenes.obtenerSaldoPorCobrar',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaOrdenId}) {
        const saldos = VentasOrdenes.findOne({_id: ventaOrdenId}, {fileds: {saldoPorCobrar: 1}});
        return Math.round(saldos.saldoPorCobrar * 100) / 100;
    }
});

const BUSQUEDAS_VENTAS_ORDENES_METHODS = _.pluck([buscarVentasOrdenes, obtenerSaldoPorCobrar], 'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_VENTAS_ORDENES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
