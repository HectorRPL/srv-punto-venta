/**
 * Created by Héctor on 19/06/2017.
 */
import template from "./menudeo.html";
import {name as EligeProductoInventarios} from "./eligeProductoInventarios/eligeProductoInventarios";
import {name as OrdenVenta} from "./ordenVenta/ordenVenta";
import {name as CrearOrdenVenta} from "./crearOrdenVenta/crearOrdenVenta";
import {name as LoginLinea} from "../loginLinea/loginLinea";
import {buscarProductoDescp} from "../../../../api/catalogos/productos/busquedas";
import {Session} from "meteor/session";


class Menudeo {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.iva = 16;
        this.productoSelec = '';
        this.tiendaId = Session.get('estacionTrabajoId');
        this.pedido = Session.get('ventaenCurso') || [] ;
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
            Session.setPersistent('ventaenCurso', this.pedido);
        }, function (reason) {

        }));
    }

    abrirModalCliente(){
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "AsignarComprobante",
            size: 'lg'
        }).result.then(this.$bindToContext((result) => {

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

const name = 'menudeo';

export default angular
    .module(name, [
        EligeProductoInventarios,
        OrdenVenta,
        CrearOrdenVenta,
        LoginLinea
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Menudeo
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.menudeo', {
            url: '/menudeo',
            template: '<menudeo></menudeo>'
        });
}

