/**
 * Created by jvltmtz on 15/11/2017.
 */
import {Session}                          from "meteor/session";
import {name as BuscarVentaOrden} from "../../comun/busquedas/buscarVentaOrden/buscarVentaOrden";
import {name as DetalleVentaOrden} from "./orden/detalle/detalleVentaOrden";
import template from "./cancelaciones.html";

class Cancelaciones {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.tiendaId = Session.get('estacionTrabajoId');
    }

    enviar(result) {
        console.log(result);
        this.$state.go('app.ventas.cancelar.orden', {ventaOrdenId: result.model._id});

    }

}

const name = 'cancelaciones';

export default angular
    .module(name, [
        BuscarVentaOrden,
        DetalleVentaOrden
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Cancelaciones
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.ventas.cancelar', {
            url: '/cancelar',
            template: '<cancelaciones></cancelaciones>'
        });
}