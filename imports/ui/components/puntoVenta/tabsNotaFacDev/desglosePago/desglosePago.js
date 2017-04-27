/**
 * Created by Héctor on 06/03/2017.
 */
import './desglosePago.html';

class DesglosePago {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }

}

const name = 'desglosePago';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/tabsNotaFacDev/${name}/${name}.html`,
        controllerAs: name,
        controller: DesglosePago,
        bindings: {
            subtotal: '<'
        }
    });

