/**
 * Created by Héctor on 19/06/2017.
 */
import {Meteor}                           from "meteor/meteor";
import {Session}                          from "meteor/session";
import {Roles}                            from "meteor/alanning:roles";
import {buscarProductoDescp}              from "../../../../api/catalogos/productos/busquedas";
import {name as EligeProductoInventarios} from "./eligeProductoInventarios/eligeProductoInventarios";
import {name as OrdenVenta}               from "./ordenVenta/ordenVenta";
import {name as CrearOrdenVenta}          from "./crearOrdenVenta/crearOrdenVenta";
import {name as LoginLinea}               from "../loginLinea/loginLinea";
import {name as AsignarCliente}           from "../menudeo/crearOrdenVenta/asignarCliente/asignarCliente";
// import {name as AsignarComprobante}       from "../menudeo/crearOrdenVenta/asignarComprobante/asignarComprobante";
import {name as MostrarDatosCliente}      from "../../comun/mostrar/mostrarDatosCliente/mostrarDatosCliente";
import template                           from "./menudeo.html";

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
        this.clienteId = '';
        this.tiendaId = Session.get('estacionTrabajoId');
        this.pedido = Session.get('ventaenCurso') || [] ;

        this.helpers({
            esVendedor(){
                return Roles.userIsInRole(Meteor.userId(), 'vendedores', 'vendedores');
            }
        });
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

    abrirModalCliente() {
        let clienteId = '';
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AsignarCliente',
            size: 'lg',
            resolve: {
                clienteId: function () {
                    return clienteId;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.clienteId = result;
        }, function (reason) {
            console.log('[reason]', reason);
        }));
    }

    /*abrirModalDatosFiscales() {
        let comprobante = '';
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AsignarComprobante',
            size: 'lg',
            resolve: {
                comprobante: function () {
                    return comprobante;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.comprobante = result;
        }, function (reason) {
            console.log('[reason]', reason);
        }));
    }*/

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
        LoginLinea,
        AsignarCliente,
        // AsignarComprobante,
        MostrarDatosCliente
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

