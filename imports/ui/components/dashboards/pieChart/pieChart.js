/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./pieChart.html";

class PieChart {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

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

        this.data = [
            {
                key: "One",
                color: "#1c84c6",
                y: 5
            },
            {
                key: "Two",
                color:"#23c6c8",
                y: 2
            },
            {
                key: "Three",
                color:"#1ab394",
                y: 9
            },
            {
                key: "Four",
                color:"#ed5565",
                y: 7
            },
            {
                key: "Five",
                color: "#f8ac59",
                y: 4
            }
        ];

    }

}

const name = 'pieChart';

export default angular
    .module(name, [
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PieChart
    });