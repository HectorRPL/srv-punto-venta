/*
 * Created by jvltmtz on 06/09/17.
 */
import {VentasPartidasOrdenes} from "../../../../../../../api/ventas/ordenes/partidas/collection";
import {name as ModalCancelarProductos} from "../modalCancelarProductos/modalCancelarProductos"
import {name as ModalCancelarDia} from "../modalCancelarDia/modalCancelarDia";
import template from "./listaVentaPartidas.html";
import {VentasOrdenes} from "../../../../../../../api/ventas/ordenes/collection";

class ListaVentaPartidas {
    constructor($scope, $reactive, $uibModal, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.ventaOrdenId = $stateParams.ventaOrdenId;
        this.subscribe('ventasPartidasOrdenes.lista', () => [
            {ventaOrdenId: this.ventaOrdenId}, {}
            ]);

        this.helpers({
            partidas() {
                return VentasPartidasOrdenes.find({ventaOrdenId: this.ventaOrdenId});
            }
        });

    }


    abrirCancelaciones(partida){
        const venta =  VentasOrdenes.findOne({_id: this.ventaOrdenId});
        let hoy = new Date().setHours(0, 0, 0, 0);
        console.log(venta);

        if (venta.fechaCreacion < hoy) {
            this.modalCancelaciones(partida)
        } else {
            this.modalCancelacionesDia(partida);
        }

    }
    modalCancelaciones(partida) {
        const partidaEnviada = partida;

        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'ModalCancelarProductos',
            backdrop: 'static',
            size: 'lg',
            keyboard: true,
            resolve: {
                partida: function () {
                    return partidaEnviada;
                }
            }
        }).result.then(this.$bindToContext((result) => {

        }, function (reason) {

        }));
    }

    modalCancelacionesDia(partida) {
        const partidaEnviada = partida;

        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'ModalCancelarDia',
            backdrop: 'static',
            size: 'lg',
            keyboard: true,
            resolve: {
                partida: function () {
                    return partidaEnviada;
                }
            }
        }).result.then(this.$bindToContext((result) => {

        }, function (reason) {

        }));
    }


}

const name = 'listaVentaPartidas';

export default angular
    .module(name, [
        ModalCancelarProductos,
        ModalCancelarDia
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaVentaPartidas,
        bindings: {
            ventaOrdenId: '<'
        }
    });