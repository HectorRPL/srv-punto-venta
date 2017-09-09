/**
 * Created by jvltmtz on 16/08/17.
 */
import {name as ProductosEntregar} from './productosEntregar/productosEntregar';
import {name as ConfirmarImpresion} from './confirmarImpresion/confirmarImpresion';
import {VentasPartidasOrdenes} from '../../../../../../api/ventas/ordenes/partidas/collection';
import {VentasOrdenes} from '../../../../../../api/ventas/ordenes/collection';
import {Ventas} from '../../../../../../api/ventas/collection';
import template from './finalizarVenta.html';

class FinalizarVenta {
    constructor($scope, $reactive, $stateParams, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
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
            ventaTotal(){
                return Counts.get('venta.total');
            },
            ventaSubtotal(){
                return Counts.get('venta.subTotal');
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

        }, function (reason) {

        }));
    }

    crearFactor() {

    }

}

const name = 'finalizarVenta';

export default angular
    .module(name, [
        ProductosEntregar,
        ConfirmarImpresion
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
            template: '<finalizar-venta></finalizar-venta>'
        });
}