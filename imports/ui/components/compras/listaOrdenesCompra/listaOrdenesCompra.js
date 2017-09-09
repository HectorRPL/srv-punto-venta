/**
 * Created by Héctor on 03/05/2017.
 */
import template from "./listaOrdenesCompra.html";

class ListaOrdenesCompra {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            ordenes(){
                return [
                    {numeroOrden: 3214, relacion: 456512, claveEmpleado: '2132', autorizado: 'HECTOR FLORES',    monto: '421.00', fechaCreacion: '2017-May-09, 11:45 am', estado: 1},
                    {numeroOrden: 3215, relacion: 456513, claveEmpleado: '2133', autorizado: 'FILIBERTO FLORES', monto: '500.25', fechaCreacion: '2017-May-10, 12:45 am', estado: 2},
                    {numeroOrden: 3216, relacion: 456514, claveEmpleado: '2134', autorizado: 'MARIO MEJORADA',   monto: '900.78', fechaCreacion: '2017-May-11, 01:45 pm', estado: 3},
                    {numeroOrden: 3217, relacion: 456515, claveEmpleado: '2135', autorizado: 'FERNANDO VIZUET',  monto: '100.16', fechaCreacion: '2017-May-12, 03:00 pm', estado: 4}
                ];
            }
        });
    }
}

const name = 'listaOrdenesCompra';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaOrdenesCompra
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras.lista', {
            url: '/lista',
            template: '<lista-ordenes-compra></lista-ordenes-compra>'
        });
}