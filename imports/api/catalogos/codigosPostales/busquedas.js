/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {CodigosPostales} from "./collection";

export const buscarColonias = new ValidatedMethod({
    name: 'codigosPostales.buscarColonias',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        cp: {type: String}
    }).validator(),
    run({cp}) {
        const resultado = CodigosPostales.find({codigo: cp}).fetch();
        return resultado;
    }
});

const BUSQUEDAS_CODIGOS_POSTALES_METHODS = _.pluck([buscarColonias], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_CODIGOS_POSTALES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}

