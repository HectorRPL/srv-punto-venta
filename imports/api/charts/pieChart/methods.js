/**
 * Created by Héctor on 13/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {PieChart} from "./collection";

const CAMPOS_PIE_CHART = ['_id', 'key', 'y'];

export const actualizarPieChartOne = new ValidatedMethod({
    name: 'pieChart.actualizarPieChartOne',
    mixins: [CallPromiseMixin],
    validate: PieChart.simpleSchema().pick(CAMPOS_PIE_CHART).validator({
        clean: true,
        filter: false
    }),
    run({_id, key, y}) {
        return PieChart.update({_id: _id}, {
            $set: {key, y}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actualizarPieChartTwo = new ValidatedMethod({
    name: 'pieChart.actualizarPieChartTwo',
    mixins: [CallPromiseMixin],
    validate: PieChart.simpleSchema().pick(CAMPOS_PIE_CHART).validator({
        clean: true,
        filter: false
    }),
    run({_id, key, y}) {
        return PieChart.update({_id: _id}, {
            $set: {key, y}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actualizarPieChartThree = new ValidatedMethod({
    name: 'pieChart.actualizarPieChartThree',
    mixins: [CallPromiseMixin],
    validate: PieChart.simpleSchema().pick(CAMPOS_PIE_CHART).validator({
        clean: true,
        filter: false
    }),
    run({_id, key, y}) {
        return PieChart.update({_id: _id}, {
            $set: {key, y}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actualizarPieChartFour = new ValidatedMethod({
    name: 'pieChart.actualizarPieChartFour',
    mixins: [CallPromiseMixin],
    validate: PieChart.simpleSchema().pick(CAMPOS_PIE_CHART).validator({
        clean: true,
        filter: false
    }),
    run({_id, key, y}) {
        return PieChart.update({_id: _id}, {
            $set: {key, y}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actualizarPieChartFive = new ValidatedMethod({
    name: 'pieChart.actualizarPieChartFive',
    mixins: [CallPromiseMixin],
    validate: PieChart.simpleSchema().pick(CAMPOS_PIE_CHART).validator({
        clean: true,
        filter: false
    }),
    run({_id, key, y}) {
        return PieChart.update({_id: _id}, {
            $set: {key, y}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

const PIE_CHARTS_METHODS = _.pluck(
    [
        actualizarPieChartOne,
        actualizarPieChartTwo,
        actualizarPieChartThree,
        actualizarPieChartFour,
        actualizarPieChartFive
    ],
    'name'
);
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PIE_CHARTS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}