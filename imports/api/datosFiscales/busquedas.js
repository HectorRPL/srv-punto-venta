/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";

export const buscarRfc = new ValidatedMethod({
    name: 'datosFiscales.buscarRfc',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        rfc: {type: String}
    }).validator(),
    run({rfc}) {
        const partialMatch = new RegExp(`^${rfc}`, 'i');
        const selector = {rfc: {$regex: partialMatch}};
        let options = {fields: {_id: 1, rfc: 1}, limit: 10};
        const resultado = DatosFiscales.find(selector, options).fetch();

        return resultado;
    }
});

const BUSQUEDAS_DATOS_FISCALES_METHODS = _.pluck([buscarRfc], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_DATOS_FISCALES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}