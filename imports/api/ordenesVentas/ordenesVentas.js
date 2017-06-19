/**
 * Created by jvltmtz on 8/06/17.
 */
import {Meteor} from "meteor/meteor";
import {OrdenesVentas} from "./collection";
import {PartidasOrdenesVentas} from "./partidasOrdenesVentas/collection";
import {ProductosPartidas} from "./partidasOrdenesVentas/productosPartidas/collection";

const MENSAJE_ERROR_ORDEN_VENTA = 'Error al crear la orden de venta, reportar al administrador del sistema';

OrdenesVentasOp = {

    altaOrdenVenta(tiendaId, ordenVenta, mesesIntereses){
        const crearOrden = Meteor.wrapAsync(OrdenesVentas.insert, OrdenesVentas);
        try {
            const orden = {
                tiendaId: tiendaId,
                subTotal: ordenVenta.subTotal,
                importeIva: ordenVenta.importeIva,
                total: ordenVenta.total,
                mesesIntereses: mesesIntereses
            };
            const ordenId = crearOrden(orden);
            ordenVenta.pedido.forEach((pedidoTemp)=> {
                this.crearPartida(pedidoTemp, ordenId);
            });

            return ordenId;
        } catch (err) {
            console.log(err);
            throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'orden-no-valida');
        }

    },

    crearPartida(pedido, ordenId){
        const crearPartida = Meteor.wrapAsync(PartidasOrdenesVentas.insert, PartidasOrdenesVentas);
        const partida = {
            ordenVentaId: ordenId,
            productoId: pedido._id,
            factorId: pedido.factorId,
            precioBase: pedido.precioBase,
            precioFinal: pedido.precioFinal,
            descuento: pedido.descuento,
            totalProductos: pedido.total
        };
        try {
            const partidaId = crearPartida(partida);

            pedido.tiendas.forEach((item)=>{
               this.crearProdcutosPartidas(item[0], item[1], partidaId);
            });

        } catch (err) {
            console.log('Erroe al crear la partida ', pedido._id);
            //throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'partida-no-valida');
        }


    },

    crearProdcutosPartidas(productoInventarioId, cantidad, partidaId){
        const crearProductos = Meteor.wrapAsync(ProductosPartidas.insert, ProductosPartidas);
        const producto = {
            partidaId: partidaId,
            productoInventarioId: productoInventarioId,
            numProductos: cantidad
        };
        try{
            crearProductos(producto);
        }catch(e){
            console.log(e);
        }

    }

};