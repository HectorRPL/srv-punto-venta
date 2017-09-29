/**
 * Created by jvltmtz on 7/08/17.
 */
import {name as FormaDireccion} from '../../../../comun/formas/formaDireccion/formaDireccion';
import {name as FormaDatosFiscales} from '../../../../comun/formas/formaDatosFiscales/formaDatosFiscales';
import {name as FormaEditarDatosFiscales} from '../../../../comun/formas/formaEditarDatosFiscales/formaEditarDatosFiscales';
import {name as BuscarDatosFiscales} from '../../../../comun/busquedas/buscarDatosFiscales/buscarDatosFiscales';
import {actualizarVentDatsFiscls} from '../../../../../../api/ventas/ordenes/methods';
import {crearDatoFiscal, actualizarDatoFiscal} from '../../../../../../api/datosFiscales/methods';
import template from './asignarFactura.html';
import {Session} from "meteor/session";
import {DatosFiscales} from "../../../../../../api/datosFiscales/collection";

class AsignarFactura {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.dtsFiscalesSelec = '';
        this.subscribe('datosFiscales.propietario', () => [{_id: this.getReactively('dtsFiscalesSelec._id')}]);

        this.helpers({
            dtsFiscales() {
                return DatosFiscales.findOne({_id: this.getReactively('dtsFiscalesSelec._id')}) || {};
            }
        });
    }

    guardar() {
        this.dtsFiscales.propietarioId = this.resolve.clienteId;
        const datosFinales = angular.copy(this.dtsFiscales);
        delete datosFinales.colonias;

        crearDatoFiscal.callPromise(datosFinales)
            .then(this.$bindToContext((result) => {
                return actualizarVentDatsFiscls.callPromise({
                    ventaId: this.ventaId, datosFiscalesId: result
                });
            }))
            .then(this.$bindToContext((datosFiscalesId) => {
                return;
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
            }));
    }

    actualizar() {
        const datosFinales = {};
        angular.copy(this.dtsFiscales, datosFinales);
        delete datosFinales.colonias;
        delete datosFinales.fechaCreacion;

        actualizarDatoFiscal.callPromise(datosFinales)
            .then(this.$bindToContext((result) => {
                return actualizarVentDatsFiscls.callPromise({
                    ventaId: this.resolve.ventaId,
                    datosFiscalesId: datosFinales._id
                });
            }))
            .then(this.$bindToContext((datosFiscalesId) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
                this.msj = err.message;
            }));
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }


}

const name = 'asignarFactura';

// create a module
export default angular
    .module(name, [
        FormaDireccion,
        FormaDatosFiscales,
        FormaEditarDatosFiscales,
        BuscarDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AsignarFactura,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });