import angular from "angular";
import angularMeteor from "angular-meteor";
import {Dias} from "../../../../../../api/catalogos/fechaNacimiento/dias/collection";
import "./elegirDia.html";

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
        templateUrl: `imports/ui/components/comun/selects/elegirFechaNacimiento/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            diaid: '='
        },
        controller: ElegirDia
    });
