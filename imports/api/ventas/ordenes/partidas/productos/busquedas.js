/**
 * Created by jvltmtz on 24/08/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {VentasProductosPartidas} from "./collection";

export const buscarCantidaAlmacen = new ValidatedMethod({
    name: 'ventasProductosPartidas.buscarCantidaAlmacen',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaProveedorId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({partidaId, tiendaProveedorId}) {
        if (Meteor.isServer) {
            const selector = {partidaId: partidaId, tiendaProveedorId: tiendaProveedorId};
            const producto = VentasProductosPartidas.findOne(selector);
            return producto ? producto.numProductos : 0;
        }

    }
});

const BUSQUEDAS_PRODUCTOS_PARTIDAS_METHODS = _.pluck([buscarCantidaAlmacen], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_PRODUCTOS_PARTIDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}