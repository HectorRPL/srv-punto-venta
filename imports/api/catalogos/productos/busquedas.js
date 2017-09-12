/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Productos} from "./collection";

export const buscarProductoDescp = new ValidatedMethod({
    name: 'marcas.buscarProductoDescp',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        codigo: {type: String}
    }).validator(),
    run({codigo}) {
        const selector = {campoBusqueda: {$regex: codigo, $options: 'i'}};

        let options = {fields: {_id: 1, marcaId:1, campoBusqueda: 1}, limit: 10};
        const resultado = Productos.find(selector, options).fetch();
        return resultado;
    }
});

const BUSQUEDAS_PRODUCTOS_METHODS = _.pluck([buscarProductoDescp], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_PRODUCTOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
