/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./multiBarChart.html";

class MultiBarChart {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.options = {
            chart: {
                type: 'multiBarChart',
                height: 270,
                x: function (d) {
                    return d.key;
                },
                y: function (d) {
                    return d.y;
                },
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
                key: 'Stream' + 1,
                color: "#1c84c6",
                values: [
                    {x: 0, y: 10},
                    {x: 1, y: 20},
                    {x: 2, y: 30},
                    {x: 3, y: 40},
                    {x: 4, y: 50}]
            },
            {
                key: 'Stream' + 2,
                color: "#23c6c8",
                values: [
                    {x: 2, y: 40},
                    {x: 4, y: 50},
                    {x: 6, y: 60}]
            },
            {
                key: 'Stream' + 3,
                color: "#1ab394",
                values: [
                    {x: 3, y: 70},
                    {x: 6, y: 80},
                    {x: 9, y: 90}]
            },
            {
                key: 'Stream' + 4,
                color: "#ed5565",
                values: [
                    {x: 5, y: 10},
                    {x: 10, y: 20},
                    {x: 15, y: 30}]
            },
            {
                key: 'Stream' + 5,
                color: "#f8ac59",
                values: [
                    {x: 10, y: 10},
                    {x: 20, y: 20},
                    {x: 30, y: 30}]
            }
        ];


    }

}

const name = 'multiBarChart';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MultiBarChart
    });