/**
 * Created by Héctor on 09/05/2017.
 */
import {name as AsignarCliente} from './asignarCliente/asignarCliente';
import {name as AsignarEntrega} from './asignarEntrega/asignarEntrega';
import {name as AsignarComprobante} from './asignarComprobante/asignarComprobante';
import {name as ResumenOrdenVenta} from './resumenOrdenVenta/resumenOrdenVenta';
import template from './crearOrdenVenta.html';

class CrearOrdenVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        // this.direccion = {};
        this.datosFiscales = {};
        this.ventaId = $stateParams.ventaId;
    }

}

const name = 'crearOrdenVenta';

export default angular
    .module(name, [
        AsignarCliente,
        AsignarEntrega,
        AsignarComprobante,
        ResumenOrdenVenta
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: CrearOrdenVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden', {
            url: '/orden/:ventaId/asignar',
            template: '<crear-orden-venta></crear-orden-venta>',
            abstract: true
        });
}