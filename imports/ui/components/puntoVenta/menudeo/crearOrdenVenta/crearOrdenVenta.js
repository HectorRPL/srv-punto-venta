/**
 * Created by Héctor on 09/05/2017.
 */
import {name as AsignarCliente} from './asignarCliente/asignarCliente';
import {name as AsignarDireccionEntrega} from './asignarDireccionEntrega/asignarDireccionEntrega';
import {name as AsignarFactura} from './asignarFactura/asignarFactura';
import {name as ResumenOrdenVenta} from './resumenOrdenVenta/resumenOrdenVenta';
import {name as FinalizarVenta} from './finalizarVenta/finalizarVenta';
import template from './crearOrdenVenta.html';

class CrearOrdenVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.ventaId = $stateParams.ventaId;
    }

}

const name = 'crearOrdenVenta';

export default angular
    .module(name, [
        AsignarCliente,
        AsignarDireccionEntrega,
        AsignarFactura,
        ResumenOrdenVenta,
        FinalizarVenta
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: CrearOrdenVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden', {
            url: '/orden/:ventaId',
            template: '<crear-orden-venta></crear-orden-venta>',
            abstract: true
        });
}