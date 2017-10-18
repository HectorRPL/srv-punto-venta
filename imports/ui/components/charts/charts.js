/**
 * Created by Héctor on 18/10/2017.
 */
import {name as EditarCharts} from "./editarCharts/editarCharts";
import template from "./charts.html";

class Charts {
    constructor() {
        'ngInject';
    }
}

const name = 'charts';

export default angular
    .module(name, [
        EditarCharts
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Charts
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.charts', {
            url: '/charts',
            template: '<charts></charts>',
            abstract: true
        });
}
