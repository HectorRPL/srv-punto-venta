/**
 * Created by jvltmtz on 14/06/17.
 */
import {VentasOrdenes} from '../../../../../../api/ventas/ordenes/collection'
import {Ventas} from '../../../../../../api/ventas/collection'
import template from './resumenOrdenVenta.html';

class ResumenOrdenVenta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('ventas.id', ()=> [{_id: this.getReactively('ventaId')}]);
        this.subscribe('ventasOrdenes.id', ()=> [{ventaId: this.getReactively('ventaId')}]);
        //this.subscribe('ventasPartidasOrdenes.ordenId', ()=> [{ordenVentaId: this.getReactively('otraformaid')}]);

        this.helpers({
            venta(){
              return Ventas.findOne({_id: this.getReactively('ventaId')});
            },
            ordenesVenta(){
                return VentasOrdenes.find({ventaId: this.getReactively('ventaId')});
            }
        });
    }
}

const name = 'resumenOrdenVenta';

export default angular
    .module(name, [

    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ResumenOrdenVenta,
        bindings: {
            ventaId: '<',
        }
    });