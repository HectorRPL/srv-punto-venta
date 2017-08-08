/**
 * Created by jvltmtz on 7/08/17.
 */
import template from './comprobanteFactura.html';

class ComprobanteFactura {
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

const name = 'comprobanteFactura';

// create a module
export default angular
    .module(name, [ ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ComprobanteFactura
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden.comprobante.factura', {
            url: '/factura',
            template: '<comprobante-factura></comprobante-factura>'
        });
}
