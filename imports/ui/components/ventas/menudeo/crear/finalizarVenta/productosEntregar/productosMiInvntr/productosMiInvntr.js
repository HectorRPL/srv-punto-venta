/**
 * Created by jvltmtz on 02/10/17.
 */
import template from './productosMiInvntr.html';
import {VentasProductosPartidas} from "../../../../../../../../api/ventas/ordenes/partidas/productos/collection";

class ProductosMiInvntr {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('ventasProductosPartidas.MiInventario', () => [
            {partidaId: this.getReactively('partidaId')}
        ]);

        this.helpers({
            prodctMiTienda() {
                return VentasProductosPartidas.findOne({
                    partidaId: this.getReactively('partidaId')
                });
            }
        });

    }
}

const name = 'productosMiInvntr';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ProductosMiInvntr,
        bindings: {
            partidaId: '<'
        }
    });