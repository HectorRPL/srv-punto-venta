/**
 * Created by Héctor on 06/03/2017.
 */
import './generarNotaFactura.html';

class GenerarNotaFactura {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }

}

const name = 'generarNotaFactura';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/tabsNotaFacDev/${name}/${name}.html`,
        controllerAs: name,
        controller: GenerarNotaFactura
    });

