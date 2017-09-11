/**
 * Created by jvltmtz on 23/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Empleados} from "./collection";

export const buscarEmpleados = new ValidatedMethod({
    name: 'empleados.buscarEmpleados',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type:String},
        nombre: {type: String}
    }).validator(),
    run({nombre}) {
        const partialMatch = new RegExp(`^${nombre}`, 'i');
        const selector = {nombreCompleto: {$regex: partialMatch}};
        let options = {fields: {_id: 1, nombreCompleto: 1}};
        const resultado = Empleados.find(selector, options).fetch();

        return resultado;
    }
});

const BUSQUEDAS_EMPLEADOS_METHODS = _.pluck([buscarEmpleados], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_EMPLEADOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
