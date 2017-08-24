/**
 * Created by jvltmtz on 16/08/17.
 */
import {name as ProductosEntregar} from './productosEntregar/productosEntregar';
import {VentasPartidasOrdenes} from '../../../../../../api/ventas/ordenes/partidas/collection';
import {VentasOrdenes} from '../../../../../../api/ventas/ordenes/collection';
import template from './finalizarVenta.html';

class FinalizarVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.soloUno = true;
        this.ventaId = $stateParams.ventaId;

        this.subscribe('ventas.id', ()=> [{_id: this.ventaId}]);
        this.subscribe('ventasOrdenes.id', ()=> [{ventaId: this.ventaId}]);
        this.subscribe('ventasPartidasOrdenes.ordenId', ()=> [{ventaOrdenId: this.getReactively('ventaOrdenId')}]);

        this.helpers({
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

}

const name = 'finalizarVenta';

export default angular
    .module(name, [
        ProductosEntregar
    ])
    .component(name, {
        template,
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