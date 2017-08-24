/**
 * Created by jvltmtz on 11/08/17.
 */
import template from './partidasOrdenesVentas.html';

class PartidasOrdenesVentas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'partidasOrdenesVentas';

export default angular
    .module(name, [

    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: PartidasOrdenesVentas,
        bindings: {
            partidas: '<'
        }
    });