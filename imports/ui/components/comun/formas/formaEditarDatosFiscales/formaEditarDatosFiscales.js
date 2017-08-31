/**
 * Created by jvltmtz on 10/08/17.
 */
import template from "./formaEditarDatosFiscales.html";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";

class FormaEditarDatosFiscales {
    constructor($scope) {
        'ngInject';
        // this.datos.abreviacion = '';
    }

    esPersonaMoral() {
        delete this.datos.nombres;
        delete this.datos.apellidos;
        delete this.datos.rfc;
        this.datos.tipoPersona = 'PM';
    }
    esPersonaFisica() {
        delete this.datos.razonSocial;
        delete this.datos.tipoSociedad;
        delete this.datos.rfc;
        this.datos.tipoPersona = 'PF';

    }

}

const name = 'formaEditarDatosFiscales';

// create a module
export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: FormaEditarDatosFiscales,
        bindings: {
            datos: '='
        }
    });