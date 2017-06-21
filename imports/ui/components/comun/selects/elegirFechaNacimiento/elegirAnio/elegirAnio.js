import angular from "angular";
import angularMeteor from "angular-meteor";
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
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            anioid: '='
        },
        controller: ElegirAnio
    });
