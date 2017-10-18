/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {NumberChart} from "./collection";

const CAMPOS = ['numero1', 'numero2', 'numero3', 'numero4', 'numero5', 'numero6'];
const ID = ['_id'];

export const actualizarNumChart = new ValidatedMethod({
    name: 'numberChart.actualizarNumChart',
    mixins: [PermissionsMixin, CallPromiseMixin],
    validate: Clientes.simpleSchema().pick(_id).validator({
        clean: true,
        filter: false
    }),
    run({_id}) {
        NumberChart.update({_id: _id}, {
            $set: {
                number1: Math.floor((Math.random() * 10000) + 1),
                number2: Math.floor((Math.random() * 100000) + 1),
                number3: Math.floor((Math.random() * 1000000) + 1),
                number4: Math.floor((Math.random() * 10000000) + 1),
                number5: Math.floor((Math.random() * 100) + 1),
                number6: Math.floor((Math.random() * 100) + 1),
                number7: Math.floor((Math.random() * 100) + 1),
                number8: Math.floor((Math.random() * 100) + 1),
                number9: Math.floor((Math.random() * 1000) + 1),
                number10: Math.floor((Math.random() * 1000) + 1)
            }
        });

    }
});


const NUMBER_CHART_METHODS = _.pluck(
    [
        actualizarNumChart,
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(NUMBER_CHART_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}