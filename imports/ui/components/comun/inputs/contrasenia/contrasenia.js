/**
 * Created by Héctor on 13/07/2017.
 */
import {buscarContrasenia} from "../../../../../api/catalogos/proveedores/busquedas";
import template from "./contrasenia.html";

class Contrasenia {
    constructor($scope) {
        'ngInject';

        this.dato = {};
    }
}

const name = 'contrasenia';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: Contrasenia
    });
