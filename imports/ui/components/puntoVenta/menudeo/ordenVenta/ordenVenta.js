/**
 * Created by jvltmtz on 19/05/17.
 */
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Roles} from "meteor/alanning:roles";
import {crearVenta} from "../../../../../api/ventas/methods";
import {name as CrearOrdenVenta} from "../crearOrdenVenta/crearOrdenVenta";
import {name as Alertas} from "../../../comun/alertas/alertas";
import template from "./ordenVenta.html";

class OrdenVenta {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.pedidoGrl = [];
        this.state = $state;
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.numTickets = new Map();

        this.helpers({
            esVendedor() {
                return Roles.userIsInRole(Meteor.userId(), 'vendedores', 'vendedores');
            }
        });
    }

    quitarArticulo(index) {
        this.subTotal = 0;
        let tickets = new Map();
        this.pedidoGrl.splice(index, 1);
        Session.setPersistent('ventaenCurso', this.pedidoGrl);

        this.pedidoGrl.forEach((item, index) => {
            tickets.set(item.mesesSinInteres, item.mesesSinInteres);
            this.subTotal += (item.precioFinal * item.total);
        });

        this.numTickets = tickets;
    }

    generarSubTotal(orden, index) {
        console.log(orden);

        if (orden.mesesSinInteres) {
            this.numTickets.set(orden.mesesSinInteres, orden.mesesSinInteres);
        }
        this.subTotal += (orden.precioFinal * orden.total);
    }

    generar() {
        console.log(this.numTickets);
        let ticketsFinal = Array.from(this.numTickets.keys());

        const ordenCompra = {
            tiendaId: this.tiendaId,
            clienteId: this.clienteId,
            pedido: this.pedidoGrl,
            numTickets: ticketsFinal,
            iva: this.iva,
            tipo: 'menudeo'
        };

        crearVenta.callPromise(ordenCompra)
            .then(this.$bindToContext((result) => {
                this.limpiar();
                this.state.go('app.venta.finalizar.entregas', {ventaId: result});
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = err.message;
            }));
    }

    limpiar() {
        this.subTotal = 0;
        this.importeIva = 0;
        this.total = 0;
        this.pedidoGrl = [];
        Session.setPersistent('ventaenCurso', []);
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