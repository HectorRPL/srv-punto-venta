/**
 * Created by jvltmtz on 24/07/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../../ordenes/collection';
import {VentasPartidasOrdenes} from './collection.js';
import {VentasProductosPartidas} from "./productos/collection";

const ventasPartidasHooks = {
    _updateComprsOrdns(doc) {

        const subTotal = (doc.precioFinal * doc.numProductos);
        const total = subTotal * (1 + (doc.iva / 100));

        VentasOrdenes.update({_id: doc.ventaOrdenId},
            {
                $inc: {
                    total: total,
                    subTotal: subTotal,
                    saldoPorCobrar: total,
                    totalPagado: 0,
                    numTotalProductos: doc.numProductos
                }
            });
    },
    _deleteProductosPartida(doc) {

        const subTotal = (doc.precioFinal * doc.numProductos);
        const total = subTotal * (1 + (doc.iva / 100));
        VentasOrdenes.update({_id: doc.ventaOrdenId},
            {
                $inc: {
                    total: -total,
                    subTotal: -subTotal,
                    saldoPorCobrar: -total,
                    numTotalProductos: -doc.numProductos
                }
            });
        VentasProductosPartidas.remove({partidaId: doc._id});

    },


    afterInsertPartidas(doc) {
        this._updateComprsOrdns(doc);
    },
    beforeRemovePartida(selector) {
        VentasPartidasOrdenes.find(selector)
            .forEach((partida) => {
                this._deleteProductosPartida(partida);
            });
    }

};

export default ventasPartidasHooks;