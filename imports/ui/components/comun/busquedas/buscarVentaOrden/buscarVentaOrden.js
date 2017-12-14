/**
 * Created by Héctor on 15/08/2017.
 */
import {buscarVentasOrdenes} from "../../../../../api/ventas/ordenes/busquedas"
import template from "./buscarVentaOrden.html";

class BuscarVentaOrden {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.ventaOrden = ''
    }

    buscar(valor) {
        return buscarVentasOrdenes.callPromise({
            tiendaId: this.tiendaId,
            numVentaOrden: Number(valor)
        }).then(function (result) {
            return result;
        });
    }

    regresarResp(item, model, label, event) {

        const result = {
            item: item,
            model: model,
            label: label,
            event: event
        };

        this.respuesta(result);

    }

}

const name = 'buscarVentaOrden';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: BuscarVentaOrden,
        bindings: {
            tiendaId: '<',
            ventaOrden: '=',
            respuesta: '&'
        },
    });