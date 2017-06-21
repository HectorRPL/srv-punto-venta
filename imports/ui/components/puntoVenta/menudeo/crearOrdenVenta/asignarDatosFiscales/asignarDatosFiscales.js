/**
 * Created by jvltmtz on 13/06/17.
 */
import {name as FormaDatosFiscales} from '../../../../comun/datosFiscales/formaDatosFiscales/formaDatosFiscales';
import {name as FormaDireccion} from '../../../../comun/direccion/formaDireccion/formaDireccion';
import './asignarDatosFiscales.html';

class AsignarDatosFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.clienteId = $stateParams.clienteId;
        this.datosFiscales = {};
        this.direccion = {};
    }

    guardarDatosFiscales() {
        this.datos = angular.copy(this.datosFiscales);
        delete this.datos.colonias;
        console.log('LINEA 21 Estos son los datos sin colonias this.datos:::::::', this.datos);
        // this.altaDatosFiscales()
    }

    // altaDatosFiscales() {
    //     insertarDatosFiscales.call(this.datosFiscales, this.$bindToContext((err) => {
    //         if (err) {
    //             this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
    //             this.tipoMsj = 'danger';
    //         } else {
    //             this.msj = 'Los datos fiscales se guardaron exitosamente.';
    //             this.tipoMsj = 'success';
    //         }
    //     }));
    // }
}

const name = 'asignarDatosFiscales';

// create a module
export default angular
    .module(name, [
        FormaDatosFiscales,
        FormaDireccion
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/menudeo/crearOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: AsignarDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.crearventa.fiscales', {
            url: '/:clienteId/fiscales',
            template: '<asignar-datos-fiscales></asignar-datos-fiscales>'
        });
}