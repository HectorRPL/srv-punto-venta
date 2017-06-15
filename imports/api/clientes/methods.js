/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Clientes} from "./collection";


const CAMPOS_CLIENTES = ['nombre', 'apellidoPaterno','apellidoMaterno'];

export const crearCliente = new ValidatedMethod({
    name: 'clientes.crearCliente',
    validate: Clientes.simpleSchema().pick(CAMPOS_CLIENTES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, apellidoPaterno, apellidoMaterno}) {
        return Clientes.insert({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
        });
    }
});

export const buscarCliente = new ValidatedMethod({
    name: 'clientes.buscarCliente',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String},
        apellidoPaterno: {type: String},
        apellidoMaterno: {type: String}
    }).validator(),
    run({nombre, apellidoPaterno, apellidoMaterno}) {
        const selector = {apellidoPaterno: apellidoPaterno, apellidoMaterno: apellidoMaterno, nombre: nombre};
        const resultado = Clientes.find(selector).fetch;
        return resultado;
    }
});

const CLIENTES_METHODS = _.pluck([crearCliente, buscarCliente], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CLIENTES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}