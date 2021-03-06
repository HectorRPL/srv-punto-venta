/**
 * Created by jvltmtz on 15/11/2017.
 */
import {Session} from "meteor/session";
import {VentasCancelaciones} from "../../../../../../../api/ventas/cancelaciones/collection";
import {crearVentaCancelacion} from "../../../../../../../api/ventas/cancelaciones/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as MotivoCancelar} from "../../../../../comun/selects/elegirMotivoCancelar/elegirMotivoCancelar";
import template from "./modalCancelarProductos.html";

class ModalCancelarProductos {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.scope = $scope;
        this.numProductosACancelar = 0;
        this.numProductosDevolver = 0;
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaOrdenId = $stateParams.ventaOrdenId;
        this.motivo = '';

        this.subscribe('ventasCancelaciones.lista', () => [
            {
                partidaId: this.getReactively('resolve.partida._id')
            }
        ]);
        this.helpers({
            cancelaciones() {
                return VentasCancelaciones.find({
                    partidaId: this.getReactively('resolve.partida._id')
                });
            },
            cancelPendientes(){
                return VentasCancelaciones.find({
                    partidaId: this.getReactively('resolve.partida._id'),
                    empleadoAutorizaId: {$exists: false}
                });
            }
        });
    }

    aceptar() {

        let cancelacion = {
            partidaId: this.resolve.partida._id,
            tiendaId: this.tiendaId,
            ventaOrdenId: this.ventaOrdenId,
            productoId: this.resolve.partida.productoId,
            numProductos: this.numProductosACancelar,
            numDevoluciones: this.numProductosDevolver,
            motivo: '1'
        };

        crearVentaCancelacion.callPromise(cancelacion).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';
            this.limpiarForma();
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.msj = err.reason;
            this.tipoMsj = 'danger';
        }));
    }

    limpiarForma() {
        this.monto = '';
        this.scope.modalCancelarProductosFrm.$setPristine();
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }

    calcularProdsDev() {

        if(this.resolve.partida.numEntregados > 0){
            if(this.resolve.partida.numCancelados > 0){
                this.numProductosDevolver = this.numProductosACancelar;

            } else {
                let result = (this.resolve.partida.numProductos - this.resolve.partida.numEntregados - this.numProductosACancelar);
                if(result < 0){
                    console.log(Math.abs(result));
                    this.numProductosDevolver = Math.abs(result);
                } else {
                    this.numProductosDevolver = 0;
                }
            }
        }




    }
}

const name = 'modalCancelarProductos';

export default angular
    .module(name, [
        Alertas,
        MotivoCancelar
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ModalCancelarProductos,
        bindings: {
            modalInstance: '<',
            resolve: '<',
            dismiss: '&',
            close: '&'
        }
    });
