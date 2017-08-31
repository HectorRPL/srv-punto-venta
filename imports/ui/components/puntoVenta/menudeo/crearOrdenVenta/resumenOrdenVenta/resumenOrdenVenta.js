/**
 * Created by jvltmtz on 14/06/17.
 */
import {VentasOrdenes} from '../../../../../../api/ventas/ordenes/collection';
import {VentasPartidasOrdenes} from '../../../../../../api/ventas/ordenes/partidas/collection';
import {name as PartidasOrdenesVentas} from  "./partidasOrdenesVentas/partidasOrdenesVentas";
import template from './resumenOrdenVenta.html';

class ResumenOrdenVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.ventaId = $stateParams.ventaId;
        this.soloUno = true;
        this.subscribe('ventas.id', ()=> [{_id: this.ventaId}]);
        this.subscribe('ventasOrdenes.id', ()=> [{ventaId: this.ventaId}]);
        this.subscribe('ventasPartidasOrdenes.ordenId', ()=> [{ventaOrdenId: this.getReactively('ventaOrdenId')}]);

        this.helpers({
            ventaTotal(){
                return Counts.get('venta.total');
            },
            ventaSubTotal(){
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

const name = 'resumenOrdenVenta';

export default angular
    .module(name, [
        PartidasOrdenesVentas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ResumenOrdenVenta
    });