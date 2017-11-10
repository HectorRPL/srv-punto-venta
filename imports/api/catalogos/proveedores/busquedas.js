/**
 * Created by Héctor on 24/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";

export const buscarProveedor = new ValidatedMethod({
    name: 'proveedores.buscarProveedor',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String}
    }).validator(),
    run({nombre}) {
        const partialMatch = new RegExp(`^${nombre}`, 'i');
        const selector = {nombre: {$regex: partialMatch}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Proveedores.find(selector, options).fetch();

        return resultado;
    }
});

export const buscarCuentaContableProveedores = new ValidatedMethod({
    name: 'proveedores.buscarCuentaContableProveedores',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        cc: {type: String}
    }).validator(),
    run({cc}) {
        const resultado = Proveedores.find({cuentaContable: cc}).fetch();
        return resultado;
    }
});


const BUSQUEDAS_PROVEEDORES_METHODS = _.pluck([buscarProveedor, buscarCuentaContableProveedores], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_PROVEEDORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
