/**
 * Created by Héctor on 07/10/17.
 */
import {_} from 'meteor/underscore';
import {VentasProductosPartidas} from "./collection";
import {ProductosInventarios} from "../../../../inventarios/productosInventarios/collection";


const productosPartidasHooks = {
        _updateDescntrMiInvntr(prod) {

            const prodsDescontar = (prod.numProductos * -1);
            ProductosInventarios.update({_id: prod.productoInventarioId},
                {$inc: {cantidad: prodsDescontar}},
                (err) => {
                    if (err) {
                        VentasProductosPartidas.update({_id: prod._id},
                            {$set: {descontado: false}});
                    }
                });

        },
        _afterUpdateProdctPartds(selector, modifier, options) {

            if (_.has(modifier.$set, 'descontado')
                && _.has(options.$multi, true)) {

                VentasProductosPartidas.find(selector, {fields: {numProductos: 1, productoInventarioId: 1}})
                    .forEach((prod) => {
                        this._updateDescntrMiInvntr(prod);
                    });

            }
        }
    }
;

export default productosPartidasHooks;