/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./dashboards.html";
import "nvd3/build/nv.d3.css";
import {nvd3} from "angular-nvd3";
import {name as PieChartClass} from "./pieChart/pieChart";
import {name as MultiBarChart} from "./multiBarChart/multiBarChart";
import {name as CumulativeLineChart} from "./cumulativeLineChart/cumulativeLineChart"

class Dashboards {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }

}

const name = 'dashboards';

export default angular
    .module(name, [
        'nvd3',
        PieChartClass,
        MultiBarChart,
        CumulativeLineChart
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Dashboards
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.dashboards', {
            url: '/dashboards',
            template: '<dashboards></dashboards>'
        });
}