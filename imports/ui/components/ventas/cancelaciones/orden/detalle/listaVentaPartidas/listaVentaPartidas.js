/*
 * Created by jvltmtz on 06/09/17.
 */
import {VentasPartidasOrdenes} from "../../../../../../../api/ventas/ordenes/partidas/collection";
import {name as ModalCancelarProductos} from "../modalCancelarProductos/modalCancelarProductos"
import template from "./listaVentaPartidas.html";

class ListaVentaPartidas {
    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.uibModal = $uibModal;
        this.subscribe('ventasPartidasOrdenes.lista', () => [
            {ventaOrdenId: this.getReactively('ventaOrdenId')}, {}
            ]);

        this.helpers({
            partidas() {
                return VentasPartidasOrdenes.find();
            }
        });

    }


    modalCancelaciones(partida) {
        const partidaEnviada = partida;

        var modalInstance = this.uibModal.open({
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


}

const name = 'listaVentaPartidas';

export default angular
    .module(name, [
        ModalCancelarProductos
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaVentaPartidas,
        bindings: {
            ventaOrdenId: '<'
        }
    });