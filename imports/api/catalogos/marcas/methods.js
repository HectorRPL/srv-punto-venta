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
export const altaMarca = new ValidatedMethod({
    name: 'marcas.altaMarca',
    validate: Marcas.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre}) {
        return Marcas.insert({nombre});
    }
});

const MARCAS_METHODS = _.pluck([altaMarca], 'name');
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