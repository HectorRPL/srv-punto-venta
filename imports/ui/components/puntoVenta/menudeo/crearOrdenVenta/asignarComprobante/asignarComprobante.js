/**
 * Created by jvltmtz on 7/08/17.
 */
import {name as FormaDireccion} from '../../../../comun/formas/formaDireccion/formaDireccion';
import {name as FormaDatosFiscales} from '../../../../comun/formas/formaDatosFiscales/formaDatosFiscales';
import {name as ComprobanteFactura} from './comprobanteFactura/comprobanteFactura';
import template from './asignarComprobante.html';

class AsignarComprobante {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.clienteId = $stateParams.clienteId;
        this.entrega = '0';
    }

    comprobante(valor) {
        //Actualizar entrega en.
        this.entrega = valor;
        if(this.entrega === '0'){
            this.state.go('.factura');
        }

    }

}

const name = 'asignarComprobante';

// create a module
export default angular
    .module(name, [
        FormaDireccion,
        FormaDatosFiscales,
        ComprobanteFactura
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AsignarComprobante
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden.comprobante', {
            url: '/:clienteId/comprobante',
            template: '<asignar-comprobante></asignar-comprobante>',
            abstract: true
        });
}