/**
 * Created by jvltmtz on 7/08/17.
 */
import template from './comprobanteFactura.html';
import {DatosFiscales} from '../../../../../../../api/datosFiscales/collection';
import {altaDatosFiscales, cambiosDatosFiscales} from '../../../../../../../api/datosFiscales/methods';
import {asignarDatosFiscalesVnt, asignarNoVentas} from '../../../../../../../api/ventas/ordenes/methods';
import {name as BuscarDatosFiscales} from '../../../../../comun/busquedas/buscarDatosFiscales/buscarDatosFiscales';
import {Session} from "meteor/session";

class ComprobanteFactura {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaId = $stateParams.ventaId;
        this.clienteId = $stateParams.clienteId;
        this.entrega = '0';
        this.dtsFiscalesSelec = '';
        this.subscribe('datosFiscales.propietario', ()=> [{_id: this.getReactively('dtsFiscalesSelec._id')}]);

        this.helpers({
            dtsFiscales(){
                return DatosFiscales.findOne({_id: this.getReactively('dtsFiscalesSelec._id')}) || {};
            }
        });
    }

    comprobante(valor) {
        //Actualizar entrega en.
        this.entrega = valor;
        if (this.entrega === '0') {
            this.state.go('.factura');
        }

    }

    guardar(){
        this.dtsFiscales.propietarioId = this.clienteId;
        const datosFinales = angular.copy(this.dtsFiscales);
        delete datosFinales.colonias;

        altaDatosFiscales.callPromise(datosFinales)
            .then(this.$bindToContext((result)=> {
                return result;
            }))
            .then(this.$bindToContext((datosFiscalesId)=> {
                return asignarDatosFiscalesVnt.callPromise({
                    ventaId: this.ventaId, datosFiscalesId: datosFiscalesId
                });
            }))
            .then(this.$bindToContext((result)=> {
                return asignarNoVentas.callPromise({ventaId: this.ventaId, tiendaId: this.tiendaId});
            }))
            .then(this.$bindToContext((result)=> {
                console.log('Acabo en fomra correcta');
                this.state.go('app.venta.finalizar', {ventaId: this.ventaId});
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }

    actualizar(){
        const datosFinales = {};
        angular.copy(this.dtsFiscales, datosFinales);
        delete datosFinales.colonias;
        delete datosFinales.fechaCreacion;

        cambiosDatosFiscales.callPromise(datosFinales)
            .then(this.$bindToContext((result)=> {
                return result;
            }))
            .then(this.$bindToContext((datosFiscalesId)=> {
                return asignarDatosFiscalesVnt.callPromise({
                    ventaId: this.ventaId,
                    datosFiscalesId: datosFinales._id
                });
            }))
            .then(this.$bindToContext((result)=> {
                return asignarNoVentas.callPromise({ventaId: this.ventaId, tiendaId: this.tiendaId});
            }))
            .then(this.$bindToContext((result)=> {
                console.log('Acabo en fomra correcta');
                this.state.go('app.venta.finalizar', {ventaId: this.ventaId});
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = err.message;
            }));
    }

}

const name = 'comprobanteFactura';

// create a module
export default angular
    .module(name, [
        BuscarDatosFiscales
    ])
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
