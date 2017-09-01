/**
 * Created by jvltmtz on 31/08/17.
 */
import {_} from 'meteor/underscore';
import {VentasEntregas} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';
const IVA = '16';

const partidasOrdenesCounts = {
    _updatePartidasEntrega(partidaId) {
        const selecEntregas = [
            {$match: {partidaId: partidaId}},
            {
                $group: {
                    _id: '$partidaId',
                    totProdcutos: {
                        $sum: '$numProductos'
                    }
                }
            }
        ];
        const sumaProductos = Meteor.wrapAsync(VentasEntregas.rawCollection().aggregate, VentasEntregas.rawCollection());
        try {
            const result = sumaProductos(selecEntregas);
            if (result.length > 0) {
                const suma = result[0].totProdcutos;
                const partida = VentasPartidasOrdenes.findOne({_id: partidaId}, {fields: {totalProductos: 1}});
                if (partida.totalProductos === suma) {
                    VentasPartidasOrdenes.update({_id: partidaId}, {$set: {entregada: true}});
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    afterUpdateEntrega(selector, modifier){
        if (_.has(modifier.$set, 'fechaEntrega')) {
            this._updatePartidasEntrega(selector);
        }
    }
};

export default partidasOrdenesCounts;