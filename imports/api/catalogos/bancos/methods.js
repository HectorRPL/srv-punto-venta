/**
 * Created by Héctor on 16/05/2017.
 */
import {Meteor} from "meteor/meteor";
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

const BANCOS_METHODS = _.pluck([buscarBanco], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BANCOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}