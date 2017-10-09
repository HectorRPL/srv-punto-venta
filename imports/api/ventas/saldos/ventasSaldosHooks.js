/**
 * Created by jvltmtz on 15/09/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../ordenes/collection';
import {VentasSaldos} from './collection.js';

const ventasSaldosHooks = {
    _afterUpdateSaldos(selector) {
        let estado = '2';

        const ventaSaldos = VentasSaldos.findOne(selector);
        if ((Math.round(ventaSaldos.saldoCobrar * 100) / 100) === 0) {
            estado = '4';
        } else if (ventaSaldos.saldoCobrar === ventaSaldos.total) {
            estado = '1';
        }

        VentasOrdenes.update({_id: selector.ventaOrdenId}, {$set: {estado: estado}});
    },
    _afterUpdateVentsSalds(selector, modifier, options) {
        if (_.has(modifier.$set, 'saldoCobrar')) {
            this._afterUpdateSaldos(selector);
        }
    }


};

export default ventasSaldosHooks;