/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Clientes} from "./collection";

export const buscarCliente = new ValidatedMethod({
    name: 'clientes.buscarCliente',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String}
    }).validator(),
    run({nombre}) {
        const partialMatch = new RegExp(`^${nombre}`, 'i');
        const selector = {nombreCompleto: {$regex: partialMatch}};
        let options = {fields: {_id: 1, nombreCompleto: 1}, limit: 10};
        const resultado = Clientes.find(selector, options).fetch();

        return resultado;
    }
});

const BUSQUEDAS_CLIENTES_METHODS = _.pluck([buscarCliente], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_CLIENTES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}