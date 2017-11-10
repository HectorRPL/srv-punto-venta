/**
 * Created by jvltmtz on 23/08/17.
 */
import {name as ProductosMiInvtr} from "./productosMiInvntr/productosMiInvntr";
import {name as EntregasPartidas} from "./entregasPartidas/entregasPartidas";
import {name as EntregasMostrador} from "./entregasMostrador/entregasMostrador";
import template from './productosEntregar.html';
import {Session} from "meteor/session";
import {VentasPartidasOrdenes} from "../../../../../../../api/ventas/ordenes/partidas/collection";

class ProductosEntregar {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaId = $stateParams.ventaId;

        this.subscribe('ventasPartidasOrdenes.lista', ()=> [{ventaId: this.ventaId}, {}]);

        this.helpers({
            partidasOrdenes(){
                return VentasPartidasOrdenes.find();
            }
        });
    }

}

const name = 'productosEntregar';

export default angular
    .module(name, [
        ProductosMiInvtr,
        EntregasMostrador,
        EntregasPartidas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ProductosEntregar
    });