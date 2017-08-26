/**
 * Created by jvltmtz on 8/06/17.
 */
import {Meteor} from "meteor/meteor";
import {Ventas} from "./collection";
import {VentasOrdenes} from "./ordenes/collection";
import {VentasPartidasOrdenes} from "./ordenes/partidas/collection";
import {VentasProductosPartidas} from "./ordenes/partidas/productos/collection";
import {CountersVentas} from "../catalogos/counters/countersVentas";

const MENSAJE_ERROR_ORDEN_VENTA = 'Error al crear la venta, reportar al administrador del sistema.';
const TIPO_VENTA = 'menudeo';

VentasMenudeoOp = {

    altaVenta(tiendaId, empleadoId){
        const crearVenta = Meteor.wrapAsync(Ventas.insert, Ventas);
        try {
            const venta = {
                tiendaId: tiendaId,
                empleadoId: empleadoId,
                tipo: TIPO_VENTA
            };
            const ventaId = crearVenta(venta);

            return ventaId;
        } catch (err) {
            console.log(err);
            throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'venta-no-valida');
        }

    },

    altaOrdenVenta(ventaId, tiendaId, numMeses, iva){

        try {
            const crearOrden = Meteor.wrapAsync(VentasOrdenes.insert, VentasOrdenes);
            const orden = {
                ventaId: ventaId,
                tiendaId: tiendaId,
                iva: iva
            };
            if (numMeses > 0) {
                orden.mesesSinInteres = numMeses;
            }
            const ordenId = crearOrden(orden);

            return ordenId;
        } catch (err) {
            console.log(err);
            throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'orden-no-valida');
        }

    },

    crearPartida(partida, ventaId){
        const partidaFinal = {
            ventaId: ventaId,
            ventaOrdenId: partida.ventaOrdenId,
            productoId: partida._id,
            factorId: partida.factorId,
            precioBase: partida.precioBase,
            precioFinal: partida.precioFinal,
            descuento: partida.descuento,
            totalProductos: partida.total
        };
        let partidaId = '';
        try {
            const crearPartida = Meteor.wrapAsync(VentasPartidasOrdenes.insert, VentasPartidasOrdenes);
            partidaId = crearPartida(partidaFinal);

            for (let j = 0; j < partida.tiendas.length; j++) {
                let item = partida.tiendas[j];
                this.crearProdcutosPartidas(item, partida.ventaOrdenId, partidaId);
            }

        } catch (err) {
            console.log('Erroe al crear la partida ', partidaId, partida.ordenVentaId, err);
            //throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'partida-no-valida');
        }


    },

    crearProdcutosPartidas(item, ventaOrdenId, partidaId){

        const crearProductos = Meteor.wrapAsync(VentasProductosPartidas.insert, VentasProductosPartidas);
        const producto = {
            partidaId: partidaId,
            ventaOrdenId: ventaOrdenId,
            tiendaProveedorId: item[1].tiendaProveedorId,
            productoInventarioId: item[0],
            numProductos: item[1].noProductos
        };
        try {
            crearProductos(producto);
        } catch (e) {
            console.log(e);
        }

    },

    actualiazarNoVenta(ventaId, tiendaId){
        const ordenes = VentasOrdenes.find({ventaId: ventaId});
        let count = 0;
        ordenes.forEach((orden)=> {

            var findOneAndUpdate = Meteor.wrapAsync(CountersVentas.rawCollection().findOneAndUpdate, CountersVentas.rawCollection());
            try {
                let result = findOneAndUpdate({_id: tiendaId}, {$inc: {seq: 1}}, {returnOriginal: false, upsert: true});
                console.log(result);
                const noOrden = result.value.seq;
                VentasOrdenes.update({_id: orden._id}, {$set: {noOrden: noOrden, estado: '1'}});
                count++;
            } catch (e) {
                throw  new Meteor.Error(401, 'Error al actualizar no orden venta ', 'no-empleado-noEncontrado');
            }
        });
        const result = VentasOrdenes.find({ventaId: ventaId, estado: '1'}).count();

        if (count === result) {
            Ventas.update({_id: ventaId}, {$set: {estado: '1'}});
        }
    },


};