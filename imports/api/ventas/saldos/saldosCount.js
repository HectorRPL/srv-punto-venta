/**
 * Created by jvltmtz on 15/09/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../ordenes/collection';
import {VentasSaldos} from './collection.js';

const ventasSaldosCounts = {
    _afterUpdateSaldos(selector) {
        let estado = '2';

        const ventaSaldos = VentasSaldos.findOne(selector);
        if ((Math.round(ventaSaldos.saldoCobrar * 100) / 100) === 0) {
            estado = '4';
        } else if(ventaSaldos.saldoCobrar ===  ventaSaldos.total){
            estado = '1';
        }

        VentasOrdenes.update({_id: selector.ventaOrdenId}, {$set: {estado: estado}});
    }
};

export default ventasSaldosCounts;