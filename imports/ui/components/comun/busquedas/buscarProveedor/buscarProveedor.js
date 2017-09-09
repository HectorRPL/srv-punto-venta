/**
 * Created by jvltmtz on 22/06/17.
 */
import template from "./buscarProveedor.html";
import {buscarProveedor} from "../../../../../api/catalogos/proveedores/busquedas";


class BuscarProveedor {
    constructor($scope) {
        'ngInject';
        this.proveedor = '';
    }

    buscar(valor) {
        return buscarProveedor.callPromise({
            nombre: valor
        }).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarProveedor';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: BuscarProveedor,
        bindings: {
            proveedor: '='
        }
    });