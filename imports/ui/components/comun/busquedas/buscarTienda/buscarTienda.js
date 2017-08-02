/**
 * Created by jvltmtz on 23/06/17.
 */
import {buscarTiendas} from "../../../../../api/catalogos/tiendas/busquedas"
import template from "./buscarTienda.html";

class BuscarTienda {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tienda = '';

    }

    buscar(valor) {
        return buscarTiendas.callPromise({nombre: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarTienda';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarTienda,
        bindings: {
            tienda: '='
        },
    });
