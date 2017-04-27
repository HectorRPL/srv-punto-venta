/**
 * Created by Héctor on 07/03/2017.
 */
import './datosEntrega.html';

class DatosEntrega {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.datos = {
            nombre: 'HECTOR',
            apellidoPaterno: 'FLORES',
            apellidoMaterno: 'VIZUET',
            direccion: {
                calle: 'Roselina',
                numeroExterior: '7',
                numeroInterior: '2',
                colonia: 'Potrero de San Bernardino',
                delegacionMunicipio: 'Xochimilco',
                estado: 'Ciudad de México',
                pais: 'México',
            },
            fechaEntrega: '17 Marzo 2016',
            telefonos: ['56769502', '45659875']
        };

    }

}

const name = 'datosEntrega';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/tabsNotaFacDev/${name}/${name}.html`,
        controllerAs: name,
        controller: DatosEntrega,
        bindings: {
            subtotal: '<'
        }
    });