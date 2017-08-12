/**
 * Created by jvltmtz on 24/07/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../../ordenes/collection';
import {VentasPartidasOrdenes} from './collection.js';
const IVA = '16';

const partidasOrdenesCounts = {
    _updateTotalesOrden(ordenVentaId) {
        const selectorTiendas = [
            {$match: {ordenVentaId: ordenVentaId}},
            {
                $group: {
                    _id: '$ordenVentaId',
                    subTotal: {$sum: {$multiply: ['$totalProductos', '$precioFinal']}}
                }
            }
        ];

        console.log(JSON.stringify(selectorTiendas));
        const totales = VentasPartidasOrdenes.aggregate(selectorTiendas);
        console.log(totales);

        const subTotal = totales[0].subTotal;
        const importeIva = subTotal * (IVA / 100);
        const total =  subTotal * (1 + (IVA / 100));

        VentasOrdenes.update({_id: ordenVentaId},
            {
                $set: {
                    subTotal: subTotal,
                    importeIva: importeIva,
                    total: total
                }
            });
    },
    afterInsertPartida(partida) {
        this._updateTotalesOrden(partida.ordenVentaId);
    }
};

export default partidasOrdenesCounts;