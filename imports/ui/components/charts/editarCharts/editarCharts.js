/**
 * Created by Héctor on 09/09/2017.
 */
import {actualizarPieChartOne}   from '../../../../api/charts/pieChart/methods';
import {actualizarPieChartTwo}   from '../../../../api/charts/pieChart/methods';
import {actualizarPieChartThree} from '../../../../api/charts/pieChart/methods';
import {actualizarPieChartFour}  from '../../../../api/charts/pieChart/methods';
import {actualizarPieChartFive}  from '../../../../api/charts/pieChart/methods';
import {actualizarNumChart}      from '../../../../api/charts/numberChart/methods';
import template                  from "./editarCharts.html";

class EditarCharts {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.actualiza = {};
        this.actualizaRandom = {};
    }

    actualizarOne() {
        this.actualiza = {
            _id: 'qMS8AzgQW6juWASHS',
            key: 'one',
            y: this.one
        }
        actualizarPieChartOne.callPromise(this.actualiza).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    actualizarTwo() {
        this.actualiza = {
            _id: 'pKLboSr6TMqzj2jkx',
            key: 'two',
            y: this.two
        }
        actualizarPieChartTwo.callPromise(this.actualiza).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    actualizarThree() {
        this.actualiza = {
            _id: 'QjMfDGWZbe5hLHH2k',
            key: 'three',
            y: this.three
        }
        actualizarPieChartThree.callPromise(this.actualiza).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    actualizarFour() {
        this.actualiza = {
            _id: 'nkjbSaMixTZgPhMup',
            key: 'four',
            y: this.four
        }
        actualizarPieChartFour.callPromise(this.actualiza).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    actualizarFive() {
        this.actualiza = {
            _id: 'DPWWmD9Jz84nJCMkt',
            key: 'five',
            y: this.five
        }
        actualizarPieChartFive.callPromise(this.actualiza).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    generarRandom() {

        this.actualizaRandom = {
            _id: 'vnDcocGpkyamPJrwK'
        }
        actualizarNumChart.callPromise(this.actualizaRandom).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarCharts';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarCharts
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.charts.editarCharts', {
            url: '/editarCharts',
            template: '<editar-charts></editar-charts>'
        });
}