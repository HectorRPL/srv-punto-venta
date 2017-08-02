/**
 * Created by jvltmtz on 8/06/17.
 */
import {Meteor} from "meteor/meteor";
import {Ventas} from "./collection";
import {VentasOrdenes} from "./ordenes/collection";
import {VentasPartidasOrdenes} from "./ordenes/partidas/collection";
import {VentasProductosPartidas} from "./ordenes/partidas/productos/collection";

const MENSAJE_ERROR_ORDEN_VENTA = 'Error al crear la venta, reportar al administrador del sistema.';
const TIPO_VENTA = 'MENUDEO';

VentasMenudeoOp = {

    altaVenta(tiendaId, subTotal, total, importeIva){
        const crearVenta = Meteor.wrapAsync(Ventas.insert, Ventas);
        try {
            const venta = {
                tiendaId: tiendaId,
                subTotal: subTotal,
                importeIva: importeIva,
                total: total,
                tipo: TIPO_VENTA
            };
            const ventaId = crearVenta(venta);

            return ventaId;
        } catch (err) {
            console.log(err);
            throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'venta-no-valida');
        }

    },

    altaOrdenVenta(ventaId, tiendaId, numMeses){

        try {
            const crearOrden = Meteor.wrapAsync(VentasOrdenes.insert, VentasOrdenes);
            const orden = {
                ventaId: ventaId,
                tiendaId: tiendaId
            };
            if(numMeses > 0){
                orden.mesesSinInteres = numMeses;
            }
            const ordenId = crearOrden(orden);

           return ordenId;
        } catch (err) {
            throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'orden-no-valida');
        }

    },

    crearPartida(partida, ordenId, ventaId){
        const partidaFinal = {
            ventaId: ventaId,
            ordenVentaId: ordenId,
            productoId: partida._id,
            factorId: partida.factorId,
            precioBase: partida.precioBase,
            precioFinal: partida.precioFinal,
            descuento: partida.descuento,
            totalProductos: partida.total
        };

        try {
            const crearPartida = Meteor.wrapAsync(VentasPartidasOrdenes.insert, VentasPartidasOrdenes);
            const partidaId = crearPartida(partidaFinal);
            console.log(partida);

            partida.tiendas.forEach((item)=> {
                this.crearProdcutosPartidas(item[0], item[1], partidaId);
            });

        } catch (err) {
            console.log('Erroe al crear la partida ', partida._id, err);
            //throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'partida-no-valida');
        }



    },

    crearProdcutosPartidas(productoInventarioId, cantidad, partidaId){
        const crearProductos = Meteor.wrapAsync(VentasProductosPartidas.insert, VentasProductosPartidas);
        const producto = {
            partidaId: partidaId,
            productoInventarioId: productoInventarioId,
            numProductos: cantidad
        };
        try {
            crearProductos(producto);
        } catch (e) {
            console.log(e);
        }

    }

};