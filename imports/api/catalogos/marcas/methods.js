/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Marcas} from "./collection";

const ID = ['_id'];

const CAMPOS_FACTORES = ['nombre'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'marcas.insertar',
    validate: Marcas.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre}) {
        return Marcas.insert({nombre});
    }
});

export const obtenerMarcas = new ValidatedMethod({
    name: 'marcas.obtenerMarcas',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        marca: {type: String}
    }).validator(),
    run({marca}) {
        const selector = {nombre: {$regex: marca, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Marcas.find(selector, options).fetch();
        return resultado;
    }
});


const MARCAS_METHODS = _.pluck([insertar, obtenerMarcas], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(MARCAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}