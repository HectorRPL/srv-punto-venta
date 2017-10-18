/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./lineWithFocusChart.html";
import {LineFocusChart} from "../../../../api/charts/lineFocusChart/collection";

class LineWithFocusChart {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('lineFocusChart.todos');
        this.helpers({
            data(){
                console.log(LineFocusChart.find({}));
                return LineFocusChart.find({});
            }
        });


        this.options = {
            chart: {
                type: 'lineWithFocusChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40
                },
                duration: 50,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                x2Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    },
                    rotateYLabel: false
                },
                y2Axis: {
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }

            }
        };


    }

}

const name = 'lineWithFocusChart';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: LineWithFocusChart
    });