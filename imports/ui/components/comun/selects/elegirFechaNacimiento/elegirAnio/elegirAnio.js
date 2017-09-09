import {Anios} from "../../../../../../api/catalogos/fechaNacimiento/anios/collection";
import template from "./elegirAnio.html";

class ElegirAnio {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('anios');

        this.helpers({
            anios() {
                return Anios.find();
            }
        });
    }

}

const name = 'elegirAnio';
// create a module

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            anioid: '='
        },
        controller: ElegirAnio
    });
