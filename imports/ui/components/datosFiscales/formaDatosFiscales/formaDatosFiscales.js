/**
 * Created by Héctor on 09/05/2017.
 */
import "./formaDatosFiscales.html";

class FormaDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.pasoDos = false;
        this.habilitarCampos = true;
    }

    esPersonaMoral() {
        this.datos = {};
        this.pasoDos = true;
        this.datos.personaFisica = false;
        this.habilitarCampos = false;
    }
    esPersonaFisica() {
        this.datos = {};
        this.pasoDos = true;
        this.datos.personaFisica = true;
        this.habilitarCampos = true;
    }

}

const name = 'formaDatosFiscales';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/datosFiscales/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    });
