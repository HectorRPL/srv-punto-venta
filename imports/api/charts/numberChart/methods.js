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
    validate: NumberChart.simpleSchema().pick(ID).validator({
        clean: true,
        filter: false
    }),
    run({_id}) {
        NumberChart.update({_id: _id}, {
            $set: {
                nummero1: Math.floor((Math.random() * 10000) + 1),
                nummero2: Math.floor((Math.random() * 100000) + 1),
                nummero3: Math.floor((Math.random() * 1000000) + 1),
                nummero4: Math.floor((Math.random() * 10000000) + 1),
                nummero5: Math.floor((Math.random() * 100) + 1),
                nummero6: Math.floor((Math.random() * 100) + 1),
                nummero7: Math.floor((Math.random() * 100) + 1),
                nummero8: Math.floor((Math.random() * 100) + 1),
                nummero9: Math.floor((Math.random() * 1000) + 1),
                nummero10: Math.floor((Math.random() * 1000) + 1)
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