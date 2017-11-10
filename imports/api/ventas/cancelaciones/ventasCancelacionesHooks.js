/**
 * Created by Héctor on 19/10/2017.
 */
import {_} from 'meteor/underscore';
import {VentasCancelaciones} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';

const ventasCancelacionesHooks = {
    _updatePartidasVentas(doc) {
        const selecCancelaciones = [
            {$match: {partidaId: doc.partidaId}},
            {
                $group: {
                    _id: '$partidaId',
                    totalCancelados: {$sum: '$numProductos'}
                }
            }
        ];
        const sumaProductosCancelados = Meteor.wrapAsync(VentasCancelaciones.rawCollection().aggregate, VentasCancelaciones.rawCollection());
        try {
            const numTotalProductosCancelados = sumaProductosCancelados(selecCancelaciones);

            if (numTotalProductosCancelados.length > 0) {
                const totalCancelados = numTotalProductosCancelados[0].totalCancelados;

                VentasPartidasOrdenes.update({_id: doc.partidaId},
                    {
                        $set: {
                            numCancelados: totalCancelados
                        }
                    });
            }
        } catch (e) {
            console.log(e);
        }
    },

    afterInsertComprsCanclcns(doc) {
        this._updatePartidasVentas(doc);
    }
};

export default ventasCancelacionesHooks;