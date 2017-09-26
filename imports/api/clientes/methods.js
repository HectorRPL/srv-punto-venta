/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Clientes} from "./collection";

const CAMPOS_CLIENTES = ['nombres', 'apellidos', 'email', 'sexo', 'telefono', 'celular'];
const CLIENTE_ID = ['_id'];

export const crearCliente = new ValidatedMethod({
    name: 'clientes.crearCliente',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_clientes'],
            group: 'clientes'
        }
    ],
    permissionsError: {
        name: 'clientes.crearCliente',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
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

export const actualizarCliente = new ValidatedMethod({
    name: 'clientes.actualizarCliente',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_clientes'],
            group: 'clientes'
        }
    ],
    permissionsError: {
        name: 'clientes.actualizarCliente',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
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

export const actualizarClienteCel = new ValidatedMethod({
    name: 'clientes.actualizarClienteCel',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_clientes'],
            group: 'clientes'
        }
    ],
    permissionsError: {
        name: 'clientes.actualizarClienteCel',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
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

const CLIENTES_METHODS = _.pluck(
    [
        crearCliente,
        actualizarCliente,
        actualizarClienteCel
    ], 'name');
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