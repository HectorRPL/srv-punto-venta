/**
 * Created by jvltmtz on 8/03/17.
 */
import "./tituloPrincipal.html";

class TituloPrincipal {
    constructor($scope, $reactive, $state) {
        'ngInject';
    }

}

const name = 'tituloPrincipal';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: TituloPrincipal,
        bindings: {
            titulo: '@'
        }
    });
