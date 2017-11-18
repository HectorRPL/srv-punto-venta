/**
 * Created by jvltmtz on 10/08/17.
 */
import template from "./formaEditarDatosFiscales.html";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";

class FormaEditarDatosFiscales {
    constructor($scope) {
        'ngInject';
    }
}

const name = 'formaEditarDatosFiscales';

// create a module
export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaEditarDatosFiscales,
        bindings: {
            datos: '='
        }
    });