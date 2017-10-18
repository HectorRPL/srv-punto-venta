/**
 * Created by Héctor on 06/03/2017.
 */
import {PieChart} from '../../../../api/charts/pieChart/collection';
import template from "./pieChart.html";

class PieChartClass {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('pieChart.todos');
        this.helpers({
            data() {
                console.log(PieChart.find());
                return PieChart.find();
            }
        });

        this.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
    }
}

const name = 'pieChart';

export default angular
    .module(name, [
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PieChartClass
    });