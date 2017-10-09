/**
 * Created by jvltmtz on 31/08/17.
 */
import {_} from 'meteor/underscore';
import {VentasEntregas} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';

const ventasEntregasHooks = {
    _updatePartidasEntrega(partidaId) {
        const selecEntregas = [
            {$match: {partidaId: partidaId}},
            {
                $group: {
                    _id: '$partidaId',
                    totalProdcutos: {$sum: '$numProductos'}
                }
            }
        ];
        const sumaProductos = Meteor.wrapAsync(VentasEntregas.rawCollection().aggregate, VentasEntregas.rawCollection());
        try {
            const result = sumaProductos(selecEntregas);
            if (result.length > 0) {
                const totalEntregados = result[0].totalProdcutos;
                const partida = VentasPartidasOrdenes.findOne({_id: partidaId},
                    {fields: {numTotalProductos: 1}});
                let modificador = {
                    $set: {
                        entregada: partida.numTotalProductos === totalEntregados,
                        numTotalEntregados: totalEntregados
                    }
                };
                VentasPartidasOrdenes.update({_id: partidaId}, modificador);
            }
        } catch (e) {
            console.log(e);
        }
    },
    afterUpdateVentsEntrgs(selector, modifier, options) {
        if (_.has(modifier.$set, 'fechaEntrega')) {
            VentasEntregas.find(selector, {fields: {partidaId: 1}}).forEach((entrega) => {
                this._updatePartidasEntrega(entrega.partidaId);
            });

        }
    }
};

export default ventasEntregasHooks;