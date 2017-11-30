/**
 * Created by jvltmtz on 8/06/17.
 */
import {Meteor} from "meteor/meteor";
import {Ventas} from "./collection";
import {VentasOrdenes} from "./ordenes/collection";
import {VentasPartidasOrdenes} from "./ordenes/partidas/collection";
import {VentasProductosPartidas} from "./ordenes/partidas/productos/collection";
import {Counters} from "../catalogos/counters/collection";

const MENSAJE_ERROR_ORDEN_VENTA = 'Error al crear la venta, reportar al administrador del sistema.';
const TIPO_VENTA = 'menudeo';

VentasOperaciones = {

    altaVenta(tiendaId) {
        return Ventas.insert({
            tiendaId: tiendaId
        }, (err) => {
            if (err) {
                throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'venta-no-valida');
            }
        });

    },

    altaOrdenVenta(ventaId, tiendaId, numMeses, empleadoId, clienteId, tipo) {

        const orden = {
            ventaId: ventaId,
            clienteId: clienteId,
            tiendaId: tiendaId,
            tipo: tipo,
            empleadoId: empleadoId
        };

        if (numMeses > 0) {
            orden.mesesSinInteres = numMeses;
        }

        return VentasOrdenes.insert(orden, (err) => {
            if (err) {
                throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'orden-no-valida');
            }

        });
    },

    crearPartida(partida, ventaId, ventaOrdenId, clienteId, iva) {

        const partidaFinal = {
            ventaId: ventaId,
            clienteId: clienteId,
            ventaOrdenId: ventaOrdenId,
            productoId: partida._id,
            factorId: partida.factorId,
            precioBase: partida.precioBase,
            precioFinal: partida.precioFinal,
            descuento: partida.descuento,
            numProductos: partida.total,
            iva: iva
        };

        return VentasPartidasOrdenes.insert(partidaFinal, (err) => {
            if (err) {
                console.log('Error al crear la partida ', partidaId, ventaOrdenId, err);
            }
        });

    },

    crearProdcutosPartidas(item, ventaOrdenId, partidaId, tiendaOrigenId) {

        const producto = {
            partidaId: partidaId,
            ventaOrdenId: ventaOrdenId,
            tiendaOrigenId: tiendaOrigenId,
            proveedorId: item[1].proveedorId,
            productoInventarioId: item[0],
            numProductos: item[1].noProductos,
            deMiInventario: item[1].deMiInventario,
            tiendaGrupo: item[1].tiendaGrupo,
        };

        VentasProductosPartidas.insert(producto, (err) => {
            if (err) {
                console.log(err);
            }
        });


        if (item[1].prodFaltante && item[1].prodFaltante > 0) {
            const producto2 = {
                partidaId: partidaId,
                ventaOrdenId: ventaOrdenId,
                tiendaOrigenId: tiendaOrigenId,
                productoInventarioId: item[0],
                numProductos: item[1].prodFaltante,
                deMiInventario: false,
                tiendaGrupo: false,
            };

            VentasProductosPartidas.insert(producto2, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

    },

    actualiazarNoVenta(ventaId, tiendaId) {
        const ordenes = VentasOrdenes.find({ventaId: ventaId});
        let count = 0;
        ordenes.forEach((orden) => {

            var findOneAndUpdate = Meteor.wrapAsync(Counters.rawCollection().findOneAndUpdate,
                Counters.rawCollection());

            try {
                let result = findOneAndUpdate(
                    {tiendaId: tiendaId, nombre: 'VENTAS'},
                    {$inc: {seq: 1}},
                    {returnOriginal: false, upsert: true});
                const noOrden = result.value.seq;
                VentasOrdenes.update({_id: orden._id},
                    {$set: {numVentaOrden: noOrden, fechaCreacion: new Date()}});
                count++;
            } catch (e) {
                throw  new Meteor.Error(401, 'Error al actualizar no orden venta ', 'no-empleado-noEncontrado');
            }
        });
    },
};