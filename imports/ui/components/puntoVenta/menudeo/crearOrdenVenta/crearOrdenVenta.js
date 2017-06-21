/**
 * Created by Héctor on 09/05/2017.
 */
import {name as AsignarCliente} from './asignarCliente/asignarCliente';
import {name as AsignarDireccionEntrega} from './asignarDireccionEntrega/asignarDireccionEntrega';
import {name as AsignarDatosFiscales} from './asignarDatosFiscales/asignarDatosFiscales';
import {name as ResumenOrdenVenta} from './resumenOrdenVenta/resumenOrdenVenta';
import './crearOrdenVenta.html';

class CrearOrdenVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        // this.direccion = {};
        this.datosFiscales = {};
        this.otraOrdenId = $stateParams.ordenId;
    }

}

const name = 'crearOrdenVenta';

export default angular
    .module(name, [
        AsignarCliente,
        AsignarDireccionEntrega,
        AsignarDatosFiscales,
        ResumenOrdenVenta
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/menudeo/${name}/${name}.html`,
        controllerAs: name,
        controller: CrearOrdenVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.crearventa', {
            url: '/:ordenId/asignar',
            template: '<crear-orden-venta></crear-orden-venta>',
            abstract: true
        });
}