/**
 * Created by jvltmtz on 13/06/17.
 */
import {name as FormaDireccion} from '../../../../comun/formas/formaDireccion/formaDireccion';
import {name as EntregaDomicilio} from './entregaDomicilio/entregaDomicilio';
import template from './asignarEntrega.html';

class AsignarEntrega {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.clienteId = $stateParams.clienteId;
        this.entrega = '0';
    }


    entregarEn(valor){
        //Actualizar entrega en.
        this.entrega = valor;
        if(valor ===  '0'){
            this.state.go('.domicilio');
        } else {
            this.state.go('app.venta.orden.comprobante.factura', {clienteId: this.clienteId});
        }

    }

}

const name = 'asignarEntrega';

// create a module
export default angular
    .module(name, [
        FormaDireccion,
        EntregaDomicilio
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AsignarEntrega
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden.entrega', {
            url: '/:clienteId/entrega',
            template: '<asignar-entrega></asignar-entrega>',
            abstract: true
        });
}