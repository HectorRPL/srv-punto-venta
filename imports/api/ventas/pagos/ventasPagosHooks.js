/**
 * Created by Héctor on 22/09/17.
 */
import {_} from 'meteor/underscore';
import {VentasPagos} from './collection';
import {VentasSaldos} from "../saldos/collection";

const ventasPagosHooks = {
    _updateVentasSaldos(ventaOrdenId) {

        const selectorSumPagos = [
            {$match: {ventaOrdenId: ventaOrdenId}},
            {
                $group: {
                    _id: '$ventaOrdenId',
                    totalPagos: {$sum: '$monto'}
                }
            }
        ];
        const ventaSaldos = VentasSaldos.findOne({ventaOrdenId: ventaOrdenId});

        const sumPagos = Meteor.wrapAsync(VentasPagos.rawCollection().aggregate, VentasPagos.rawCollection());
        let sumPagosResult = [];
        try {
            sumPagosResult = sumPagos(selectorSumPagos);
        } catch (e) {
            console.log(e);
        }

        if (sumPagosResult.length > 0) {
            VentasSaldos.update({ventaOrdenId: ventaOrdenId},
                {
                    $set: {
                        totalPagos: sumPagosResult[0].totalPagos,
                        saldoCobrar: ventaSaldos.total - sumPagosResult[0].totalPagos,
                    }
                });
        } else {
            VentasSaldos.update({ventaOrdenId: ventaOrdenId},
                {
                    $set: {
                        totalPagos: 0,
                        saldoCobrar: ventaSaldos.total,
                    }
                });
        }
    },
    afterInsertPago(doc) {
        this._updateVentasSaldos(doc.ventaOrdenId);
    },
    afterRemovePago(pago) {
        this._updateVentasSaldos(pago.ventaOrdenId);
    }
};

export default ventasPagosHooks;