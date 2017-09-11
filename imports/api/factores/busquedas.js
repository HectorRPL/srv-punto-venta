/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Factores} from "./collection";

export const buscarFactores = new ValidatedMethod({
    name: 'factores.buscarFactores',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        factor: {type: String}
    }).validator(),
    run({factor}) {
        const selector = {nombre: {$regex: factor, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Factores.find(selector, options).fetch();
        return resultado;
    }
});

const BUSQUEDAS_FACTORES_METHODS = _.pluck([buscarFactores], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_FACTORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
