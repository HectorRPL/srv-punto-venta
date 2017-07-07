/**
 * Created by Héctor on 29/03/2017.
 */
import angular from "angular";
import {name as CodigosPostales} from "../../inputs/codigosPostales/codigosPostales";
import template from "./formaDireccion.html";

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
        template,
        controllerAs: name,
        controller: FormaDireccion,
        bindings: {
            direccion: '='
        }
    });
