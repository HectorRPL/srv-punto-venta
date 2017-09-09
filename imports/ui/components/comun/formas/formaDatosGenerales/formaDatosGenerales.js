/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./formaDatosGenerales.html";

class FormaDatosGenerales {
    constructor($scope) {
        'ngInject';

        this.datos =  {
            telefonos: [{telefono: ''}]
        };

    }

    agregarTelefono() {
        this.nuevoTelefono = {
            telefono: this.telefono,
            extension: this.extension,
        };

        this.datos.telefonos.push(this.nuevoTelefono);

    }

}

const name = 'formaDatosGenerales';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaDatosGenerales,
        bindings: {
            datos: '='
        }
    });
