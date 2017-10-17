/**
 * Created by jvltmtz on 16/08/17.
 */
import {name as ProductosEntregar} from './productosEntregar/productosEntregar';
import {name as ConfirmarImpresion} from './confirmarImpresion/confirmarImpresion';
import {name as PrecioVentaOrden} from "../../../../comun/alertas/precioVentaOrden/precioVentaOrden";
import {name as MostrarDatosCliente} from "../../../../comun/mostrar/mostrarDatosCliente/mostrarDatosCliente";
import {name as MostrarDireccion} from "../../../../comun/mostrar/mostrarDireccion/mostrarDireccion";
import {name as MostrarDatosFiscales} from "../../../../comun/mostrar/mostrarDatosFiscales/mostrarDatosFiscales";
import {VentasPartidasOrdenes} from '../../../../../../api/ventas/ordenes/partidas/collection';
import {actualizarQuitrDirccn, actualizarQuitrDatsFiscls} from '../../../../../../api/ventas/ordenes/methods';
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
        this.uibModal =$uibModal;

        this.subscribe('ventas.id', ()=> [{_id: this.ventaId}]);
        this.subscribe('ventasOrdenes.id', ()=> [{ventaId: this.ventaId}]);
        this.subscribe('ventasPartidasOrdenes.ordenId', ()=> [{ventaOrdenId: this.getReactively('ventaOrdenId')}]);

        this.helpers({
            venta(){
              return Ventas.findOne({_id: this.ventaId});
            },
            ordenesVenta(){
                return VentasOrdenes.find({ventaId: this.ventaId});
            },
            partidasOrdenes(){
                return VentasPartidasOrdenes.find();
            }
        });
    }

    mostrarPartidas(ordenId) {
        this.ventaOrdenId = ordenId;
    }

    imprimir(){
        const direccionEntregaId = this.venta.direccionEntregaId;
        var modalInstance = this.uibModal.open({
            animation: true,
            component: 'ConfirmarImpresion',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                direccionId: function () {
                    return direccionEntregaId;
                }

            }
        }).result.then(this.$bindToContext((result) => {
            //TODO: Mandar a imprimir
            Meteor.logout((err)=>{
                if(!err){
                    this.$state.go('app.venta.menudeo');
                }
            });
        }, function (reason) {

        }));
    }

    abrirModlDirccin() {
        const ventaId = this.ventaId;
        const clienteId = this.ordenesVenta[0].clienteId;

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
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }

    abrirModlDatsFiscls() {
        const ventaId = this.ventaId;
        const clienteId = this.ordenesVenta[0].clienteId;

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
        PrecioVentaOrden,
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