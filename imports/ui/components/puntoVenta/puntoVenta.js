/**
 * Created by Héctor on 06/03/2017.
 */
import './puntoVenta.html';
import {name as EligeProductoInventarios} from './eligeProductoInventarios/eligeProductoInventarios';
import {name as OrdenVenta} from './ordenVenta/ordenVenta';
import {buscarProductoDescp} from "../../../api/catalogos/productos/busquedas"
import {Session} from "meteor/session";


class PuntoVenta {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.iva = 16;
        this.pedido = [];
        this.productoSelec = '';
        this.tiendaId = Session.get('estacionTrabajoId');
        console.log('punto de venta ', Session.get('estacionTrabajoId'));

    }

    abrirModal(prodBuscado) {
        prodBuscado.tiendaId = this.tiendaId;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "EligeProductoInventarios",
            size: 'lg',
            resolve: {
                producto: function () {
                    return prodBuscado;
                }

            }
        }).result.then(this.$bindToContext((result) => {
            const index = this.pedido.findIndex((item)=> {
                return item._id === result._id;
            });
            if (index === -1) {
                this.pedido.push(result);
            } else {
                this.pedido.splice(index, 1, result);
            }


        }, function (reason) {

        }));
    }

    prueba(item) {
        this.abrirModal(item);
    }

    buscarProducto(valor) {
        return buscarProductoDescp.callPromise({
            codigo: valor
        }).then(function (result) {
            return result;
        });
    }


}

const name = 'puntoVenta';

export default angular
    .module(name, [
        EligeProductoInventarios,
        OrdenVenta
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: PuntoVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta', {
            url: '/venta',
            template: '<punto-venta></punto-venta>'
        });
}

