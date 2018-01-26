/**
 * Created by jvltmtz on 31/08/17.
 */
import {_} from 'meteor/underscore';
import {VentasEntregas} from './collection';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';

const ventasEntregasHooks = {
    _updateVentaOrden(entrega) {
        VentasPartidasOrdenes.update({_id: entrega.partidaId}, {
            $inc: {
                numEntregados: entrega.numProductos
            }
        });

        VentasOrdenes.update({_id: entrega.ventaOrdenId}, {
            $inc: {
                numTotalEntregados: entrega.numProductos
            }
        });
    },
    afterUpdateVentsEntrgs(selector, modifier, options) {
        if (_.has(modifier.$set, 'fechaEntrega')) {
            VentasEntregas.find(selector, {
                fields: {
                    partidaId: 1, ventaOrdenId: 1,
                    numProductos: 1
                }
            })
                .forEach((entrega) => {
                    this._updateVentaOrden(entrega);
                });

        }
    }
};

export default ventasEntregasHooks;