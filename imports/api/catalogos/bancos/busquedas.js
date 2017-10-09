/**
 * Created by Héctor on 09/09/2017.
 */
import {Meteor} from "meteor/meteor";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Bancos} from "./collection";

export const buscarBanco = new ValidatedMethod({
    name: 'bancos.buscarBanco',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String}
    }).validator(),
    run({nombre}) {

        const selector = {nombre: {$regex: nombre, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Bancos.find(selector, options).fetch();

        return resultado;
    }
});

const BUSQUEDAS_BANCOS_METHODS = _.pluck([buscarBanco], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_BANCOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}