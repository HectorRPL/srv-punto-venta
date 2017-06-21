/**
 * Created by Héctor on 29/03/2017.
 */
import angular from "angular";
import {name as CodigosPostales} from "../../busquedas/codigosPostales/codigosPostales";
import "./formaDireccion.html";

class FormaDireccion {
    constructor($scope) {
        'ngInject';
        this.direccion = {};
    }
}

const name = 'formaDireccion';

// create a module
export default angular
    .module(name, [
        CodigosPostales
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/formas/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDireccion,
        bindings: {
            direccion: '='
        }
    });
