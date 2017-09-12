/**
 * Created by jvltmtz on 7/08/17.
 */
import {name as FormaDireccion} from '../../../../comun/formas/formaDireccion/formaDireccion';
import {name as FormaDatosFiscales} from '../../../../comun/formas/formaDatosFiscales/formaDatosFiscales';
import {name as FormaEditarDatosFiscales} from '../../../../comun/formas/formaEditarDatosFiscales/formaEditarDatosFiscales';
import {name as ComprobanteFactura} from './comprobanteFactura/comprobanteFactura';
import {asignarNoVentas} from '../../../../../../api/ventas/ordenes/methods';
import template from './asignarComprobante.html';
import {Session} from "meteor/session";

class AsignarComprobante {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.tiendaId = Session.get('estacionTrabajoId');
        this.clienteId = $stateParams.clienteId;
        this.ventaId = $stateParams.ventaId;
        console.log(this.ventaId);
        this.entrega = '0';
    }

    comprobante(valor) {
        //Actualizar entrega en.
        this.entrega = valor;
        if (this.entrega === '0') {
            this.state.go('.factura');
        } else {
            asignarNoVentas.callPromise({ventaId: this.ventaId, tiendaId: this.tiendaId})
                .then(this.$bindToContext(()=> {
                    this.state.go('app.venta.finalizar', {ventaId: this.ventaId});
                })).catch(this.$bindToContext((err)=>{
                    console.log(err);
            }));
        }

    }

}

const name = 'asignarComprobante';

// create a module
export default angular
    .module(name, [
        FormaDireccion,
        FormaDatosFiscales,
        ComprobanteFactura,
        FormaEditarDatosFiscales
    ])
    .component(name, {
        template: template.default,
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