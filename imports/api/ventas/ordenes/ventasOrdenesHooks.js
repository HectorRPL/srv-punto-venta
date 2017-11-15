/**
 * Created by jvltmtz on 03/11/17.
 */
import {_} from 'meteor/underscore';
import {VentasEntregas} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';
import {VentasProductosPartidas} from "./partidas/productos/collection";
import {ProductosInventarios} from "../../inventarios/productosInventarios/collection";

const ventasOrdenesHooks = {
    _updateInventrio(prod) {
        const prodsDescontar = (prod.numProductos * -1);
        ProductosInventarios.update({_id: prod.productoInventarioId},
            {$inc: {cantidad: prodsDescontar}},
            (err) => {
                if (!err) {
                    VentasProductosPartidas.update({_id: prod._id},
                        {$set: {descontado: true}});
                }
            });

    },
    _updateInventrioSaldo(prod) {
        const prodsDescontar = (prod.numProductos * -1);

        ProductosInventarios.update({_id: prod.productoInventarioId},
            {$inc: {cantidadSaldo: prodsDescontar}},
            (err) => {
                if (!err) {
                    VentasProductosPartidas.update({_id: prod._id},
                        {$set: {descontado: true}});
                }
            });


    },


    afterUpdateVentsOrdns(selector, modifier, options) {

        if (_.has(modifier, '$set') &&_.has(modifier.$set, 'numVentaOrden')) {
            VentasProductosPartidas.find({ventaOrdenId: selector._id},
                {fields: {productoInventarioId: 1, numProductos:1}})
                .forEach((producto) => {
                    console.log(producto);
                    if (producto.saldo) {
                        this._updateInventrioSaldo(producto);
                    } else {
                        this._updateInventrio(producto);
                    }
                });
        }
    }
};

export default ventasOrdenesHooks;