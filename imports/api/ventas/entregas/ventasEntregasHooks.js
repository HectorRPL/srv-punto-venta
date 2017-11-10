/**
 * Created by jvltmtz on 31/08/17.
 */
import {_} from 'meteor/underscore';
import {VentasEntregas} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';

const ventasEntregasHooks = {
    _updatePartidasEntrega(doc) {
        const selectorEntregas = [
            {$match: {partidaId: doc.partidaId}},
            {
                $group: {
                    _id: '$partidaId',
                    sumEntregados: {$sum: '$numProductos'}
                }
            }
        ];
        const sumaProductos = Meteor.wrapAsync(VentasEntregas.rawCollection().aggregate,
            VentasEntregas.rawCollection());
        try {

            const totalEntregados = sumaProductos(selectorEntregas);

            if (totalEntregados.length > 0) {

                VentasPartidasOrdenes.update({_id: doc.partidaId},
                    {
                        $set: {
                            numEntregados: totalEntregados[0].sumEntregados
                        }
                    });
            }
        } catch (e) {
            console.log(e);
        }
    },
    afterUpdateVentsEntrgs(selector, modifier, options) {
        if (_.has(modifier.$set, 'fechaEntrega')) {
            VentasEntregas.find(selector, {fields: {partidaId: 1}}).forEach((entrega) => {
                this._updatePartidasEntrega(doc);
            });

        }
    }
};

export default ventasEntregasHooks;