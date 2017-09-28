/**
 * Created by jvltmtz on 19/05/17.
 */
import {Meteor} from "meteor/meteor";
import {Roles} from "meteor/alanning:roles";
import template from "./ordenVenta.html";
import {name as CrearOrdenVenta} from "../crearOrdenVenta/crearOrdenVenta";
import {crearVenta} from "../../../../../api/ventas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {Session} from "meteor/session";

class OrdenVenta {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mesesIntereses = {
            pedido: [],
            numMeses: []
        };
        this.otraFormaPago = {
            pedido: [],
        };
        this.state = $state;
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.numPedidosMeses = new Map();

        this.helpers({
            esVendedor(){
                return Roles.userIsInRole(Meteor.userId(), 'vendedores', 'vendedores');
            }
        });
    }

    quitarArticulo(index) {
        let subTotal = 0;
        let pedidoOtro = [];
        let pedidoMeses = [];
        let numMeses = new Map();
        this.pedidoGrl.splice(index, 1);
        Session.setPersistent('ventaenCurso', this.pedidoGrl);

        this.pedidoGrl.forEach((item)=> {
            if (item.mesesSinInteres) {
                numMeses.set(item.mesesSinInteres, item.mesesSinInteres);
                pedidoMeses.push(item);
            } else {
                pedidoOtro.push(item);
            }

            subTotal += (item.precioFinal * item.total);
        });

        this.numPedidosMeses = numMeses;
        this.mesesIntereses.pedido = pedidoMeses;
        this.otraFormaPago.pedido = pedidoOtro;
        this.subTotal = subTotal;
        this.generarTotales();
    }

    generarSubTotal(orden) {

        if (orden.mesesSinInteres) {
            this.numPedidosMeses.set(orden.mesesSinInteres, orden.mesesSinInteres);
            this.mesesIntereses.pedido.push(orden);
        } else {
            this.otraFormaPago.pedido.push(orden);
        }
        this.subTotal += (orden.precioFinal * orden.total);
        this.generarTotales();
    }

    generar() {
        this.mesesIntereses.numMeses = Array.from(this.numPedidosMeses.keys());
        const ordenCompra = {
            tiendaId: this.tiendaId,
            clienteId: this.clienteId,
            total: this.total,
            subTotal: this.subTotal,
            importeIva: this.importeIva,
            otraFormaPago: this.otraFormaPago,
            mesesIntereses: this.mesesIntereses,
            iva: this.iva
        };

        console.log('[88][ordenCompra]', ordenCompra);
        /*crearVenta.call(ordenCompra, this.$bindToContext((err, result)=> {
            if (err) {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = err.message;
            } else {
                this.limpiar();
                console.log('--[98][result]--', result);
                // this.state.go('app.venta.orden.cliente', {ventaId: result});
            }
        }));*/
    }

    limpiar() {
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.pedidoGrl = [];
        Session.setPersistent('ventaenCurso', []);
    }

    generarTotales(){
        this.importeIva = this.subTotal * (this.iva / 100);
        this.total = this.subTotal * (1 + (this.iva / 100));
    }

}

const name = 'ordenVenta';

export default angular
    .module(name, [
        CrearOrdenVenta,
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: OrdenVenta,
        bindings: {
            pedidoGrl: '=',
            iva: '<',
            clienteId: '<',
            tiendaId: '<'
        }
    });