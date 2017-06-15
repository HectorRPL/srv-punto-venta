/**
 * Created by jvltmtz on 13/06/17.
 */
import {name as FormaDatosFiscales} from '../../../comun/datosFiscales/formaDatosFiscales/formaDatosFiscales';
import {name as FormaDireccion} from '../../../comun/direccion/formaDireccion/formaDireccion';
import './asignarDatosFiscales.html';

class AsignarDatosFiscales {
    constructor() {
        this.datosFiscales = {};
        this.direccion = {};
    }
}

const name = 'asignarDatosFiscales';

// create a module
export default angular
    .module(name, [
        FormaDatosFiscales,
        FormaDireccion
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/crearOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: AsignarDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.crearventa.fiscales', {
            url: '/:clienteId/fiscales',
            template: '<asignar-datos-fiscales></asignar-datos-fiscales>'
        });
}