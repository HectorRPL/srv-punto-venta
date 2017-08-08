/**
 * Created by jvltmtz on 8/08/17.
 */
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas"

import template from "./buscarDatosFiscales.html";

class BuscarDatosFiscales {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.datosFiscales = '';

    }

    buscar(valor) {
        return buscarRfc.callPromise({rfc: valor}).then(function (result) {
            return result;
        });
    }


}

const name = 'buscarDatosFiscales';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarDatosFiscales,
        bindings: {
            datosFiscales: '='
        }
    });