/**
 * Created by Héctor on 19/10/2017.
 */
import {_} from 'meteor/underscore';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';
import {VentasNotasPartidas} from "../notasCredito/partidas/collection";

const ventasCancelacionesHooks = {
    _insertPartidasNotas(doc) {

        if (doc.requiereNota) {
            console.log(doc);
            const partida = VentasPartidasOrdenes.findOne({_id: doc.partidaId});

            VentasNotasPartidas.insert({
                productoId: partida.productoId,
                factorId: partida.factorId,
                iva: partida.iva,
                precioBase: partida.precioBase,
                precioFinal: partida.precioFinal,
                partidaId: doc.partidaId,
                numProductos: doc.numProductos,
                cancelacionId: doc._id
            });
        }

    },

    afterInsertVentasCanclcns(doc) {
        this._insertPartidasNotas(doc);
    }
};

export default ventasCancelacionesHooks;