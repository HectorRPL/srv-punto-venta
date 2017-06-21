/**
 * Created by Héctor on 01/05/2017.
 */
import template from "./compras.html";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaOrdenesCompra} from './listaOrdenesCompra/listaOrdenesCompra';
import {name as ElegirTipoOrden} from './elegirTipoOrden/elegirTipoOrden';

class Compras {
    constructor() {
        'ngInject';
        this.titulo = 'Órdenes de Compra';
    }

}

const name = 'compras';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        ListaOrdenesCompra,
        ElegirTipoOrden
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Compras
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras', {
            url: '/compras',
            template: '<compras></compras>',
            abstract: true
        });
}