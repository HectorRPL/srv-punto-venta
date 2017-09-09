/**
 * Created by Héctor on 13/06/2017.
 */
import {buscarProductos} from "../../../../../api/catalogos/productos/busquedas"
import template from "./buscarProducto.html";

class BuscarProducto {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.producto = ''

    }

    buscar(valor) {
        return buscarProductos.callPromise({
            marcaId: this.marcaid,
            codigo: valor
        }).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarProducto';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: BuscarProducto,
        bindings: {
            marcaid: '<',
            producto: '='
        },
    });
