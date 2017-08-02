/**
 * Created by Héctor on 14/06/2017.
 */
import {buscarFactores} from "../../../../../api/factores/busquedas"
import template from "./buscarFactor.html";

class BuscarFactor {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarFactor(valor) {
        return buscarFactores.callPromise({factor: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarFactor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarFactor,
        bindings: {
            factor: '='
        },
    });


