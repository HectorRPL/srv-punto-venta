/**
 * Created by jvltmtz on 14/06/17.
 */
import {OrdenesVentas} from '../../../../../../api/ordenesVentas/collection'
import {PartidasOrdenesVentas} from '../../../../../../api/ordenesVentas/partidasOrdenesVentas/collection'
import template from './resumenOrdenVenta.html';

class ResumenOrdenVenta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('ordenesVentas.id', ()=> [{_id: this.getReactively('otraformaid')}]);
        this.subscribe('partidasOrdenesVentas.ordenId', ()=> [{ordenVentaId: this.getReactively('otraformaid')}]);

        this.helpers({
            ordenVenta(){
                return OrdenesVentas.findOne({_id: this.getReactively('otraformaid')});
            },
            partidasOrden(){
                return PartidasOrdenesVentas.find();
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
            otraformaid: '<',
            mesesinteresid: '<'
        }
    });