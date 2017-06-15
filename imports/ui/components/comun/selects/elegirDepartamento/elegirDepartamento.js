/**
 * Created by jvltmtz on 4/04/17.
 */
import "./elegirDepartamento.html";
import {PuestosRoles} from "../../../../../api/catalogos/puestosRoles/collection"

class ElegirDepartamento {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('puestoRoles');

        this.helpers({
            departamentos() {
                return PuestosRoles.find();
            }
        });

    }
}

const name = 'elegirDepartamento';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            departamento: '='
        },
        controller: ElegirDepartamento
    });
