/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Marcas} from "./collection";

export const buscarMarcas = new ValidatedMethod({
    name: 'marcas.buscarMarcas',
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

const BUSQUEDAS_MARCAS_METHODS = _.pluck([buscarMarcas], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_MARCAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}

