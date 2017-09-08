/**
 * Created by jvltmtz on 24/07/17.
 */
import {_} from 'meteor/underscore';
import {VentasOrdenes} from '../../ordenes/collection';
import {VentasPartidasOrdenes} from './collection.js';
const IVA = '16';

const partidasOrdenesCounts = {
    _updateTotalesOrden(ventaOrdenId) {
        console.log('__updateTotalesOrden ', ventaOrdenId);

        /*const selectorTiendas = [
         {$match: {ventaOrdenId: ventaOrdenId}},
         {
         $group: {
         _id: '$ventaOrdenId',
         subTotal: {$sum: {$multiply: ['$totalProductos', '$precioFinal']}}
         }
         }
         ];*/

        /*const totales = VentasPartidasOrdenes.find({ventaOrdenId: ventaOrdenId}).fetch();
         let subTotal = 0;
         totales.forEach((item)=>{
         subTotal +=  (item.precioFinal * item.totalProductos);
         });

         const importeIva = subTotal * (IVA / 100);
         const total =  subTotal * (1 + (IVA / 100));

         VentasOrdenes.update({_id: ventaOrdenId},
         {
         $set: {
         subTotal: subTotal,
         importeIva: importeIva,
         total: total
         }
         });*/
    },
    _updateEntregadaOrden(selector){
        const partida = VentasPartidasOrdenes.findOne(selector, {fields: {ventaOrdenId: 1}});
        const result = VentasPartidasOrdenes.find({ventaOrdenId: partida.ventaOrdenId, entregada: false}).count();

        if (result === 0) {
            VentasOrdenes.update({_id: partida.ventaOrdenId}, {$set: {entregada: true}});
        }
    },
    afterInsertPartida(partida){
        this._updateTotalesOrden(partida.ventaOrdenId);
    },
    afterUpdatePartida(selector, modifier){
        if (_.has(modifier.$set, 'entregada')) {
            this._updateEntregadaOrden(selector);
        }
    }
};

export default partidasOrdenesCounts;