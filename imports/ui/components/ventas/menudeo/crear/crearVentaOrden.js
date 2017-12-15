/**
 * Created by Héctor on 5/12/2017.
 */
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Roles} from "meteor/alanning:roles";
import {name as AsignarCliente} from "./asignarCliente/asignarCliente";
import {actualizarVentaCliente} from "../../../../../api/ventas/ordenes/methods";
import {name as MostrarDatosCliente} from "../../../comun/mostrar/mostrarDatosCliente/mostrarDatosCliente";
import {name as PartidasVentaOrden} from "./partidasVentaOrden/partidasVentaOrden";
import {name as FinalizarVenta} from "./finalizarVenta/finalizarVenta";
import template from "./crearVentaOrden.html";

class CrearVentaOrden {

    constructor($scope, $reactive, $uibModal, $stateParams, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.$state = $state;
        this.clienteId = '';
        this.ventaId = $stateParams.ventaId;
        this.tiendaId = Session.get('estacionTrabajoId');
        this.subscribe('ventas.totales', () => [{ventaId: this.ventaId}]);

        this.helpers({
            esVendedor() {
                return Roles.userIsInRole(Meteor.userId(), 'vendedores', 'vendedores');
            },
            ventaTotal() {
                return Counts.get('ventaTotal');
            },
            ventaSubTotal() {
                return Counts.get('ventaSubTotal');
            }
        });
    }

    abrirModalCliente() {
        let clienteId = '';
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AsignarCliente',
            size: 'lg',
            resolve: {
                clienteId: function () {
                    return clienteId;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log(result);
            this.clienteId = result.clienteId;
        }, function (reason) {
            console.log('[reason]', reason);
        }));
    }

    generar() {

        actualizarVentaCliente.callPromise({ventaId: this.ventaId, clienteId: this.clienteId})
            .then(this.$bindToContext((result) => {
                this.$state.go('app.ventas.finalizar.entregas', {ventaId: this.ventaId});
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
                this.msj = err.message;
            }));
    }

}

const name = 'crearVentaOrden';

export default angular
    .module(name, [
        AsignarCliente,
        MostrarDatosCliente,
        PartidasVentaOrden,
        FinalizarVenta
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: CrearVentaOrden
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.ventas.menudeo.crear', {
            url: '/:ventaId/crear',
            template: '<crear-venta-orden></crear-venta-orden>'
        });
}

