/**
 * Created by jvltmtz on 24/07/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../../ordenes/collection';
import {VentasPartidasOrdenes} from './collection.js';

const partidasEntregasCounts = {
    _afterUpdateEntregadaOrden(selector) {

        const partida = VentasPartidasOrdenes.findOne(selector, {fields: {ventaOrdenId: 1}});
        const result = VentasPartidasOrdenes.find({ventaOrdenId: partida.ventaOrdenId, entregada: false}).count();
        if (result === 0) {
            VentasOrdenes.update({_id: partida.ventaOrdenId}, {$set: {entregada: true}});
        }
    }
};

export default partidasEntregasCounts;