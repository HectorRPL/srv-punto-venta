/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Clientes} from "./collection";

const CAMPOS_CLIENTES = ['nombres', 'apellidos', 'email', 'sexo', 'telefono', 'celular'];
const CLIENTE_ID = ['_id'];

export const altaCliente = new ValidatedMethod({
    name: 'clientes.altaCliente',
    mixins: [CallPromiseMixin],
    validate: Clientes.simpleSchema().pick(CAMPOS_CLIENTES).validator({
        clean: true,
        filter: false
    }),
    run({nombres, apellidos, email, sexo}) {
        return Clientes.insert({nombres, apellidos, email, sexo}, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
            }
        });
    }
});

export const cambiosCliente = new ValidatedMethod({
    name: 'clientes.cambiosCliente',
    mixins: [CallPromiseMixin],
    validate: Clientes.simpleSchema().pick(CLIENTE_ID, CAMPOS_CLIENTES).validator({
        clean: true,
        filter: false
    }),
    run({_id, nombres, apellidos, email, sexo, telefono, celular}) {
        return Clientes.update({_id: _id}, {$set: {nombres, apellidos, email, sexo, telefono, celular}}, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'cliente-no-creado');
            }
        });
    }
});

export const cambiosClienteCel = new ValidatedMethod({
    name: 'clientes.cambiosClienteCel',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        _id: {type: String, regEx: SimpleSchema.RegEx.Id},
        celular: {type: String},
        telefono: {type: String, optional: true}
    }).validator(),
    run({_id, celular, telefono}) {
        return Clientes.update({_id: _id}, {$set: {celular, telefono}}, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'no-actualizo-telefonos');
            }
        });
    }
});

const CLIENTES_METHODS = _.pluck([altaCliente, cambiosCliente, cambiosClienteCel], 'name');
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