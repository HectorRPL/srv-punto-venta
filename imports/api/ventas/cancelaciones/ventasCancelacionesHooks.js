/**
 * Created by Héctor on 19/10/2017.
 */
import {_} from 'meteor/underscore';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';
import {VentasNotasPartidas} from "../notasCredito/partidas/collection";
import {VentasOrdenes} from "../ordenes/collection";
import {VentasDevolucionesPartidas} from "../devoluciones/partidas/collection";

const ventasCancelacionesHooks = {
    _insertPartidasNotas(doc) {

        const venta = VentasOrdenes.findOne({_id: doc.ventaOrdenId});
        const partida = VentasPartidasOrdenes.findOne({_id: doc.partidaId}, {
            fields: {factorId: 1, iva: 1, precioFinal: 1, precioBase: 1}
        });

        let hoy = new Date().setHours(0, 0, 0, 0);

        if (venta.fechaCreacion < hoy) {

            VentasNotasPartidas.insert({
                productoId: doc.productoId,
                factorId: partida.factorId,
                iva: partida.iva,
                precioBase: partida.precioBase,
                precioFinal: partida.precioFinal,
                ventaPartidaId: doc.partidaId,
                numProductos: doc.numProductos,
                cancelacionId: doc._id
            });
        } else{
           VentasDevolucionesPartidas.insert({
                   productoId: doc.productoId,
                   factorId: partida.factorId,
                   iva: partida.iva,
                   precioBase: partida.precioBase,
                   precioFinal: partida.precioFinal,
                   ventaPartidaId: doc.partidaId,
                   numProductos: doc.numProductos,
                   cancelacionId: doc._id
               }
           );
        }

    },

    afterInsertVentasCanclcns(doc) {
        this._insertPartidasNotas(doc);
    }
};

export default ventasCancelacionesHooks;