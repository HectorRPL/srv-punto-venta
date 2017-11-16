/*
 * Created by jvltmtz on 06/09/17.
 */
import {VentasOrdenes} from "../../../../../../api/ventas/ordenes/collection";
import {name as ListaVentaPartidas} from "./listaVentaPartidas/listaVentaPartidas";
import template from "./detalleVentaOrden.html";

class DetalleVentaOrden {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.ventaOrdenId = $stateParams.ventaOrdenId;
        this.subscribe('ventasOrdenes.lista', () => [{_id: this.ventaOrdenId}]);

        this.helpers({
            orden(){
                return VentasOrdenes.findOne({_id: this.ventaOrdenId});
            }
        });
    }


}

const name = 'detalleVentaOrden';

export default angular
    .module(name, [
        ListaVentaPartidas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: DetalleVentaOrden
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.ventas.cancelar.orden', {
            url: '/:ventaOrdenId/orden',
            template: '<detalle-venta-orden></detalle-venta-orden>'
        });
}