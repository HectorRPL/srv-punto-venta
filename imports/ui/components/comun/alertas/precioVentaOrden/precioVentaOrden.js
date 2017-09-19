/**
 * Created by jvltmtz on 18/09/17.
 */
import template from './precioVentaOrden.html';
import {VentasSaldos} from "../../../../../api/ventas/saldos/collection";

class PrecioVentaOrden {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('ventasSaldos.ventaOrdenId', () => [
            {
                ventaOrdenId: this.getReactively('ventaOrdenId')
            }
        ]);
        this.helpers({
            totales() {
                return VentasSaldos.findOne({ventaOrdenId: this.getReactively('ventaOrdenId')});
            }
        });
    }
}

const name = 'precioVentaOrden';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PrecioVentaOrden,
        bindings: {
            ventaOrdenId: '<'
        }
    });