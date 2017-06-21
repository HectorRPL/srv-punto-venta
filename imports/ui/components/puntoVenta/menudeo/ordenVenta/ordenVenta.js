/**
 * Created by jvltmtz on 19/05/17.
 */
import template from "./ordenVenta.html";
import {name as CrearOrdenVenta} from "../crearOrdenVenta/crearOrdenVenta";
import {altaOrdenVenta} from "../../../../../api/ordenesVentas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";

class OrdenVenta {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mesesIntereses = {
            pedido: [],
            total: 0,
            importeIva: 0,
            subTotal: 0
        };
        this.otraFormaPago = {
            pedido: [],
            subTotal: 0,
            importeIva: 0,
            total: 0
        };
        this.state = $state;
    }

    quitarArticulo(index) {
        let totalOtro = 0;
        let pedidoOtro = [];
        let totalMeses = 0;
        let pedidoMeses = [];
        this.pedidogrl.splice(index, 1);

        this.pedidogrl.forEach((item)=> {
            if(item.mesesSinInteres){
                pedidoMeses.push(item);
                totalMeses += (item.precioFinal * item.total);
            } else {
                pedidoOtro.push(item);
                totalOtro += (item.precioFinal * item.total);
            }

        });
        this.mesesIntereses.pedido = pedidoMeses;
        this.mesesIntereses.subTotal = totalMeses;
        this.mesesIntereses.importeIva = totalMeses * (this.iva / 100);
        this.mesesIntereses.total = totalMeses * (1 + (this.iva / 100));

        this.otraFormaPago.pedido = pedidoOtro;
        this.otraFormaPago.subTotal = totalOtro;
        this.otraFormaPago.importeIva = totalOtro * (this.iva / 100);
        this.otraFormaPago.total = totalOtro * (1 + (this.iva / 100));
    }

    generarSubTotal(producto) {

        if (producto.mesesSinInteres) {
            this.mesesIntereses.pedido.push(producto);
            this.mesesIntereses.subTotal += (producto.precioFinal * producto.total);
            this.mesesIntereses.importeIva += (producto.precioFinal * producto.total) * (this.iva / 100);
            this.mesesIntereses.total += (producto.precioFinal * producto.total) * (1 + (this.iva / 100));
        } else {
            this.otraFormaPago.pedido.push(producto);
            this.otraFormaPago.subTotal += (producto.precioFinal * producto.total);
            this.otraFormaPago.importeIva += (producto.precioFinal * producto.total) * (this.iva / 100);
            this.otraFormaPago.total += (producto.precioFinal * producto.total) * (1 + (this.iva / 100));
        }


    }

    generar() {
        const ordenCompra = {
            otraFormaPago: this.otraFormaPago,
            mesesIntereses: this.mesesIntereses,
            tiendaId: this.tiendaid
        };
        altaOrdenVenta.call(ordenCompra, this.$bindToContext((err, result)=>{
            if(err){
                this.tipoMsj = 'danger';
                this.msj = err.message;
            } else {
                if(result.ordenMesesId && result.ordenOtraFormaId){
                    this.state.go();
                } else {
                    this.state.go('app.venta.crearventa.cliente', {ordenId: result.ordenOtraFormaId});
                }
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
            pedidogrl: '=',
            iva: '<',
            tiendaid: '<'
        }
    });