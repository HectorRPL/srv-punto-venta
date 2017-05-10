/**
 * Created by Héctor on 09/05/2017.
 */
import {name as FormaDireccion} from '../../direccion/formaDireccion/formaDireccion';
import {name as FormaDatosFiscales} from '../../datosFiscales/formaDatosFiscales/formaDatosFiscales';
import './crearOrdenVenta.html';

class CrearOrdenVenta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        // this.direccion = {};
        this.datosFiscales = {};
        this.datosEntrega =  {
            telefonos: [{telefono: ''}, {telefono: ''}],
            direccion: {}

        };
    }

    generarCobro(direccionEntrega, datosFiscales) {
        let direccionEntregaFinal = angular.copy(direccionEntrega);
        delete direccionEntregaFinal.colonias;

        let datosFiscalesFinal = angular.copy(datosFiscales);
        delete datosFiscalesFinal.colonias;

        console.log('Estos es direccionEntrega', direccionEntregaFinal);
        console.log('Esto es datosFiscales', datosFiscalesFinal);

        // console.log('Esto es lo que vamos a enviar: ', item);
    }
}

const name = 'crearOrdenVenta';

export default angular
    .module(name, [
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: CrearOrdenVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.crearordenventa', {
            url: '/crearordenventa',
            template: '<crear-orden-venta></crear-orden-venta>'
        });
}

