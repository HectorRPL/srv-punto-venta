/**
 * Created by Héctor on 14/06/2017.
 */
import {buscarMarcas} from "../../../../../api/catalogos/marcas/busquedas"
import template from "./buscarMarca.html";

class BuscarMarca {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.marca = '';

    }

    buscarMarca(valor) {
        return buscarMarcas.callPromise({marca: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarMarca';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarMarca,
        bindings: {
            marca: '='
        },
    });

