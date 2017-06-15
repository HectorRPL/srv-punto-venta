import angular from "angular";
import angularMeteor from "angular-meteor";
import {Anios} from "../../../../../../api/catalogos/fechaNacimiento/anios/collection";
import "./elegirAnio.html";

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
        templateUrl: `imports/ui/components/comun/selects/elegirFechaNacimiento/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            anioid: '='
        },
        controller: ElegirAnio
    });
