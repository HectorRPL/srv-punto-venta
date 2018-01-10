/**
 * Created by Héctor on 04/05/2017.
 */
import {Session} from "meteor/session";
import template from "./eligeProductoInventarios.html";
import {crearVentaOrden} from "../../../../../api/ventas/ordenes/methods";
import {crearPartidaOrden, borrarPartidaOrden} from "../../../../../api/ventas/ordenes/partidas/methods";
import {crearProductosPartida} from "../../../../../api/ventas/ordenes/partidas/productos/methods";
import {ProductosInventarios} from "../../../../../api/inventarios/productosInventarios/collection";
import {ConfiguracionesGlobales} from "../../../../../api/catalogos/configuracionesGlobales/collection";
import {name as ExistenciaOtrasTiendas} from "./existenciaOtrasTiendas/existenciaOtrasTiendas";
import {name as ElegirMesesIntereses} from "../../../comun/selects/elegirMesesIntereses/elegirMesesIntereses";
import {VentasOrdenes} from "../../../../../api/ventas/ordenes/collection";
import {VentasPartidasOrdenes} from "../../../../../api/ventas/ordenes/partidas/collection";

class EligeProductoInventarios {

    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.sumProductosTiendas = 0;
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaId = $stateParams.ventaId;
        this.productosTiendas = [];
        this.cantidadSolicitada = 0;
        this.precioFinal = 0;
        this.descuentoFinal = 0;
        this.mesesSinInteres = 0;

        this.subscribe('ventasOrdenes.lista', () => [{ventaId: this.ventaId}]);
        this.subscribe('configuracionesGlobales.lista', () => [{_id: 'iva'}]);
        this.subscribe('productosInventarios.lista', () => [
            {
                productoId: this.getReactively('resolve.producto._id')
            }]);


        this.helpers({
            miInventario() {
                return ProductosInventarios.findOne({tiendaId: this.tiendaId});
            },
            ventasOrdenes() {
                return VentasOrdenes.find({ventaId: this.ventaId});
            },
            conf() {
                return ConfiguracionesGlobales.findOne({_id: "iva"})
            },
        });
    }


    aceptar() {

        const ventaOrden = VentasOrdenes.findOne({
            ventaId: this.ventaId,
            mesesSinInteres: Number(this.mesesSinInteres)
        });

        if (ventaOrden) {
            this.obtenerPartida(this.ventaId, ventaOrden._id);
        } else {
            this.crearOrden();
        }
    }

    crearOrden() {
        const ordenVentaFinal = {
            ventaId: this.ventaId,
            tiendaId: this.tiendaId,
            mesesSinInteres: Number(this.mesesSinInteres),
            tipo: 'menudeo'
        };
        crearVentaOrden.callPromise(ordenVentaFinal)
            .then(this.$bindToContext((result) => {
                this.obtenerPartida(this.ventaId, result);
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
            }));
    }

    obtenerPartida(ventaId, ventaOrdenId) {

        let partida = VentasPartidasOrdenes.findOne({
            ventaId: ventaId, productoId: this.resolve.producto._id
        });

        if (partida) {
            Meteor.defer(() => {
                borrarPartidaOrden.callPromise({_id: partida._id})
                    .then(this.$bindToContext((result) => {
                        console.log(result);
                    }))
                    .catch(this.$bindToContext((error) => {
                        console.log(error);
                    }));
            });

        }
        const nuevaPartida = {
            ventaId: ventaId,
            ventaOrdenId: ventaOrdenId,
            productoId: this.resolve.producto._id,
            factorId: this.miInventario.factorId,
            precioBase: this.miInventario.precioUno(),
            precioFinal: this.precioFinal,
            descuento: this.descuentoFinal,
            numProductos: this.cantidadSolicitada + this.sumProductosTiendas,
            iva: this.conf.valor
        };
        this.crearPartida(nuevaPartida);
    }


    crearPartida(partida) {
        crearPartidaOrden.callPromise(partida)
            .then(this.$bindToContext((result) => {
                this.creaProductos(result, partida.ventaOrdenId);
            }))
            .catch(this.$bindToContext((error) => {
                console.log(error);
            }))
    }

    creaProductos(partidaId, ventaOrdenId) {

        let prodFaltante = 0;
        if (this.cantidadSolicitada > 0) {
            if (this.cantidadSolicitada > this.miInventario.cantidad) {
                let cantFaltante = this.cantidadSolicitada - this.miInventario.cantidad;
                if (cantFaltante > 0) {
                    const prodFaltante = {
                        _id: this.miInventario._id,
                        cantidadSolicitada: cantFaltante
                    };
                    this.productosTiendas.push(prodFaltante);
                    this.miInventario.cantidadSolicitada = (this.cantidadSolicitada - cantFaltante);
                    this.productosTiendas.push(this.miInventario);
                }
            } else {
                this.miInventario.cantidadSolicitada = this.cantidadSolicitada;
                this.productosTiendas.push(this.miInventario);
            }

        }


        const producto = {
            tiendaOrigenId: this.tiendaId,
            partidaId: partidaId,
            ventaOrdenId: ventaOrdenId,
            productos: this.productosTiendas
        };

        crearProductosPartida.callPromise(producto)
            .then(this.$bindToContext((result) => {
                this.modalInstance.close('agregado');
            }))
            .catch(this.$bindToContext((error) => {
                console.log(error);
            }));
    }

    cancelarCerrar() {
        this.modalInstance.dismiss('Cancelado');
    }

    asignarDescuento(desc) {
        this.descuentoFinal = desc;
    }

    asignarMeses(meses) {
        this.mesesSinInteres = meses;
    }

}

const name = 'eligeProductoInventarios';

// Módulo
export default angular
    .module(name, [
        ExistenciaOtrasTiendas,
        ElegirMesesIntereses
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EligeProductoInventarios,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });

