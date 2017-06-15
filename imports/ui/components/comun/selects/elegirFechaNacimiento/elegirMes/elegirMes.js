import angular from "angular";
import angularMeteor from "angular-meteor";
import {Meses} from "../../../../../../api/catalogos/fechaNacimiento/meses/collection";
import "./elegirMes.html";

class ElegirMes {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('meses');

        this.helpers({
            meses() {
                return Meses.find();
            }
        });
    }

}

const name = 'elegirMes';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/elegirFechaNacimiento/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            mesid: '='
        },
        controller: ElegirMes
    });
