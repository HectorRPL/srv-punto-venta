/**
 * Created by jvltmtz on 19/05/17.
 */
import template from "./ordenVenta.html";
import {name as CrearOrdenVenta} from "../crearOrdenVenta/crearOrdenVenta";
import {altaVenta} from "../../../../../api/ventas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";

class OrdenVenta {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mesesIntereses = {
            pedido: [],
            total: 0,
            importeIva: 0,
            subTotal: 0,
            numMeses: []
        };
        this.otraFormaPago = {
            pedido: [],
            subTotal: 0,
            importeIva: 0,
            total: 0
        };
        this.state = $state;
        this.numPedidosMeses = new Map();
    }

    quitarArticulo(index) {
        let subTotalOtro = 0;
        let subTotalMeses = 0;
        let pedidoOtro = [];
        let pedidoMeses = [];
        let numMeses = new Map();
        this.pedidoGrl.splice(index, 1);

        this.pedidoGrl.forEach((item)=> {
            if (item.mesesSinInteres) {
                numMeses.set(item.mesesSinInteres, item.mesesSinInteres);
                pedidoMeses.push(item);
                subTotalMeses += (item.precioFinal * item.total);
            } else {
                pedidoOtro.push(item);
                subTotalOtro += (item.precioFinal * item.total);
            }

        });

        this.numPedidosMeses = numMeses;
        this.mesesIntereses.pedido = pedidoMeses;
        this.mesesIntereses.subTotal = subTotalMeses;
        this.mesesIntereses.importeIva = subTotalMeses * (this.iva / 100);
        this.mesesIntereses.total = subTotalMeses * (1 + (this.iva / 100));

        this.otraFormaPago.pedido = pedidoOtro;
        this.otraFormaPago.subTotal = subTotalOtro;
        this.otraFormaPago.importeIva = subTotalOtro * (this.iva / 100);
        this.otraFormaPago.total = subTotalOtro * (1 + (this.iva / 100));
    }

    generarSubTotal(orden) {

        if (orden.mesesSinInteres) {
            this.numPedidosMeses.set(orden.mesesSinInteres, orden.mesesSinInteres);
            this.mesesIntereses.pedido.push(orden);
            this.mesesIntereses.subTotal += (orden.precioFinal * orden.total);
            this.mesesIntereses.importeIva += (orden.precioFinal * orden.total) * (this.iva / 100);
            this.mesesIntereses.total += (orden.precioFinal * orden.total) * (1 + (this.iva / 100));
        } else {
            this.otraFormaPago.pedido.push(orden);
            this.otraFormaPago.subTotal += (orden.precioFinal * orden.total);
            this.otraFormaPago.importeIva += (orden.precioFinal * orden.total) * (this.iva / 100);
            this.otraFormaPago.total += (orden.precioFinal * orden.total) * (1 + (this.iva / 100));
        }


    }

    generar() {
        this.mesesIntereses.numMeses = Array.from(this.numPedidosMeses.keys());
        const ordenCompra = {
            otraFormaPago: this.otraFormaPago,
            mesesIntereses: this.mesesIntereses,
            tiendaId: this.tiendaId
        };

        console.log(ordenCompra);

        altaVenta.call(ordenCompra, this.$bindToContext((err, result)=> {
            if (err) {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = err.message;
            } else {

                this.state.go('app.venta.orden.cliente', {ventaId: result});
            }
        }));
    }
}

const name = 'ordenVenta';

export default angular
    .module(name, [
        CrearOrdenVenta,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: OrdenVenta,
        bindings: {
            pedidoGrl: '=',
            iva: '<',
            tiendaId: '<'
        }
    });