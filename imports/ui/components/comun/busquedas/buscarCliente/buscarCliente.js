/**
 * Created by jvltmtz on 26/07/17.
 */
import {buscarCliente} from "../../../../../api/clientes/busquedas"

import template from "./buscarCliente.html";

class BuscarCliente {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.cliente = '';

    }

    buscar(valor) {
        return buscarCliente.callPromise({nombre: valor}).then(function (result) {
            return result;
        });
    }


}

const name = 'buscarCliente';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarCliente,
        bindings: {
            cliente: '='
        }
    });