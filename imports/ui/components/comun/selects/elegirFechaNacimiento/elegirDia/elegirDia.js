import angular from "angular";
import angularMeteor from "angular-meteor";
import {Dias} from "../../../../../../api/catalogos/fechaNacimiento/dias/collection";
import template from "./elegirDia.html";

class ElegirDia {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('dias');

        this.helpers({
            dias() {
                return Dias.find();
            }
        });
    }

}

const name = 'elegirDia';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            diaid: '='
        },
        controller: ElegirDia
    });
