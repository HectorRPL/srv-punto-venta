/**
 * Created by Héctor on 01/05/2017.
 */
import template from "./elegirTipoOrden.html";
import {name as BuscarProductoTiendas} from './buscarProductoTiendas/buscarProductoTiendas';
import {name as BuscarProductoProveedores} from './buscarProductoProveedores/buscarProductoProveedores';

class ElegirTipoOrden {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'MENUUUUUU PENDIENTE';
    }
}

const name = 'elegirTipoOrden';

// create a module
export default angular
    .module(name, [
        BuscarProductoTiendas,
        BuscarProductoProveedores
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ElegirTipoOrden
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras.elegirtipoorden', {
            url: '/elegirtipoorden',
            template: '<elegir-tipo-orden></elegir-tipo-orden>'
        });
}