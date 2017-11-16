/**
 * Created by jvltmtz on 23/08/17.
 */
import {name as ProductosMiInvtr} from "./productosMiInvntr/productosMiInvntr";
import {name as EntregasPartidas} from "./entregasPartidas/entregasPartidas";
import {name as EntregasMostrador} from "./entregasMostrador/entregasMostrador";
import {actualizarNumVentaOrden} from '../../../../../../../api/ventas/methods';
import {VentasPartidasOrdenes} from "../../../../../../../api/ventas/ordenes/partidas/collection";
import template from './productosEntregar.html';
import {Session} from "meteor/session";

class ProductosEntregar {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaId = $stateParams.ventaId;
        this.$state = $state;

        this.subscribe('ventasPartidasOrdenes.lista', ()=> [{ventaId: this.ventaId}, {}]);
        this.subscribe('ventas.count.totalProductos', () => [{ventaId: this.ventaId}]);
        this.subscribe('ventas.count.totalEntregas', () => [{ventaId: this.ventaId}]);

        this.helpers({
            partidasOrdenes(){
                return VentasPartidasOrdenes.find();
            },
            totalProductos() {
                return Counts.get('ventaNumTotalProductos');
            },
            totalEntregas() {
                return Counts.get('ventaNumTotalEntregas');
            }
        });
    }

    finalizarVenta() {
        const venta = {
            ventaId: this.ventaId,
            tiendaId: this.tiendaId
        };

        actualizarNumVentaOrden.callPromise(venta)
            .then(this.$bindToContext((result) => {
                this.$state.go('app.ventas.finalizar.tickets');
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            }));
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
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.ventas.finalizar.entregas', {
            url: '/entregas',
            template: '<productos-entregar></productos-entregar>',
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