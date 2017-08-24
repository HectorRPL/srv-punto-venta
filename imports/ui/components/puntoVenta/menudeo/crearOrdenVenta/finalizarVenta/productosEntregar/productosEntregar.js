/**
 * Created by jvltmtz on 23/08/17.
 */
import template from './productosEntregar.html';

class ProductosEntregar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'productosEntregar';

export default angular
    .module(name, [

    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ProductosEntregar,
        bindings: {
            partidas: '<'
        }
    });