/**
 * Created by Héctor on 07/03/2017.
 */
import './datosFiscalesCliente.html';

class DatosFiscalesCliente {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.datos = {
            razonSocial: 'RHANE S.A. DE C.V.',
            email: 'hector.kaizen@gmail.com',
            rfc: 'FOVH8310319X9',
            direccion: {
                calle: 'Roselina',
                numeroExterior: '7',
                numeroInterior: '2',
                colonia: 'Potrero de San Bernardino',
                delegacionMunicipio: 'Xochimilco',
                estado: 'Ciudad de México',
                pais: 'México',
            },
            telefonos: ['56769502']
        };

    }

}

const name = 'datosFiscalesCliente';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/tabsNotaFacDev/${name}/${name}.html`,
        controllerAs: name,
        controller: DatosFiscalesCliente,
        bindings: {
            subtotal: '<'
        }
    });