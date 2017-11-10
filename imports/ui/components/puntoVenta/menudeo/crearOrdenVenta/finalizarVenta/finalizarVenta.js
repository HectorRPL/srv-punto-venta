/**
 * Created by jvltmtz on 16/08/17.
 */
import {name as ProductosEntregar} from './productosEntregar/productosEntregar';
import {name as ConfirmarImpresion} from './confirmarImpresion/confirmarImpresion';
import {name as MostrarDatosCliente} from "../../../../comun/mostrar/mostrarDatosCliente/mostrarDatosCliente";
import {name as MostrarDireccion} from "../../../../comun/mostrar/mostrarDireccion/mostrarDireccion";
import {name as MostrarDatosFiscales} from "../../../../comun/mostrar/mostrarDatosFiscales/mostrarDatosFiscales";
import {actualizarQuitrDatsFiscls, actualizarQuitrDirccn} from '../../../../../../api/ventas/ordenes/methods';
import {actualizarNumVentaOrden} from '../../../../../../api/ventas/methods';
import {VentasOrdenes} from '../../../../../../api/ventas/ordenes/collection';
import {Ventas} from '../../../../../../api/ventas/collection';
import template from './finalizarVenta.html';

class FinalizarVenta {
    constructor($scope, $reactive, $stateParams, $uibModal, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.soloUno = true;
        this.ventaId = $stateParams.ventaId;
        this.uibModal = $uibModal;

        this.subscribe('ventas.id', () => [{_id: this.ventaId}]);
        this.subscribe('ventas.count.totalProductos', () => [{ventaId: this.ventaId}]);
        this.subscribe('ventas.count.totalEntregas', () => [{ventaId: this.ventaId}]);
        this.subscribe('ventasOrdenes.lista', () => [{ventaId: this.ventaId}]);

        this.helpers({
            venta() {
                return Ventas.findOne({_id: this.ventaId});
            },
            ordenesVenta() {
                return VentasOrdenes.find({ventaId: this.ventaId});
            },
            totalProductos() {
                return Counts.get('ventaNumTotalProductos');
            },
            totalEntregas() {
                return Counts.get('ventaNumTotalEntregas');
            }
        });
    }

    imprimir() {
        const venta = {
            ventaId: this.ventaId,
            tiendaId: this.venta.tiendaId
        };

        actualizarNumVentaOrden.callPromise(venta)
            .then(this.$bindToContext((result) => {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            }))
            .catch(this.$bindToContext((err) => {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            }));
    }

    abrirModlDirccin() {
        const ventaId = this.ventaId;
        const clienteId = this.ordenesVenta.clienteId;

        console.log(clienteId);

        var modalInstance = this.uibModal.open({
            animation: true,
            component: "AsignarDireccionEntrega",
            size: 'lg',
            resolve: {
                ventaId: function () {
                    return ventaId;
                },
                clienteId: function () {
                    return clienteId;
                }
            }
        }).result.then(this.$bindToContext((result) => {

        }, function (reason) {

        }));
    }

    quitarDireccionEntrg() {
        actualizarQuitrDirccn.callPromise({ventaId: this.ventaId})
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
                this.msj = 'Se han imprimido los tickets : ';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }

    abrirModlDatsFiscls() {
        const ventaId = this.ventaId;
        const clienteId = this.ordenesVenta.clienteId;

        var modalInstance = this.uibModal.open({
            animation: true,
            component: "AsignarFactura",
            size: 'lg',
            resolve: {
                ventaId: function () {
                    return ventaId;
                },
                clienteId: function () {
                    return clienteId;
                }
            }
        }).result.then(this.$bindToContext((result) => {

        }, function (reason) {

        }));
    }


    quitarDatsFiscls() {
        actualizarQuitrDatsFiscls.callPromise({ventaId: this.ventaId})
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }


}

const name = 'finalizarVenta';

export default angular
    .module(name, [
        ProductosEntregar,
        ConfirmarImpresion,
        MostrarDatosCliente,
        MostrarDireccion,
        MostrarDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FinalizarVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.finalizar', {
            url: '/:ventaId/finalizar',
            template: '<finalizar-venta></finalizar-venta>',
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}