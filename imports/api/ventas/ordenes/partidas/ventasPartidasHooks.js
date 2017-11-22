/**
 * Created by jvltmtz on 24/07/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../../ordenes/collection';
import {VentasPartidasOrdenes} from './collection.js';

const ventasPartidasHooks = {
    _updateOrdenEntregada(selector) {

    },
    _updateOrdenCancelada(selector) {


    },
    _updateComprsOrdns(doc) {
        console.log(doc);

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
    afterUpdatePartida(selector, modifier) {

        if (_.has(modifier.$set, 'numEntregados')) {
            this._updateOrdenEntregada(selector);
        }

        if (_.has(modifier.$set, 'numCancelados')) {
            this._updateOrdenCancelada(selector, modifier);
        }
    },

    afterInsertPartidas(doc) {
        this._updateComprsOrdns(doc);
    }

};

export default ventasPartidasHooks;