/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./cumulativeLineChart.html";
import {CumulativeChart} from "../../../../api/charts/cumulativeChart/collection";

class CumulativeLineChart {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('cumulativeChart.todos');
        this.helpers({
            data(){
                return CumulativeChart.find({});
            }
        });

        this.options = {
            chart: {
                type: 'cumulativeLineChart',
                height: 350,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]/100; },
                average: function(d) { return d.mean/100; },

                //color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 0
                }
            }
        };

    }

}

const name = 'cumulativeLineChart';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: CumulativeLineChart
    });