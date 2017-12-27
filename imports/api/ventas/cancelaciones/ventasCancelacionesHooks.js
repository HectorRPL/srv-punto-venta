/**
 * Created by Héctor on 19/10/2017.
 */
import {_} from 'meteor/underscore';
import {VentasPartidasOrdenes} from '../ordenes/partidas/collection';
import {VentasNotasPartidas} from "../notasCredito/partidas/collection";
import {VentasOrdenes} from "../ordenes/collection";
import {VentasDevolucionesPartidas} from "../devoluciones/partidas/collection";
import {VentasNotasCredito} from "../devoluciones/collection";
import {VentasCancelaciones} from "./collection";

const ventasCancelacionesHooks = {

    _insertVentasNotas(doc) {

        const venta = VentasOrdenes.findOne({_id: doc.ventaOrdenId});

        let hoy = new Date().setHours(0, 0, 0, 0);

        if (venta.fechaCreacion < hoy) {
            const notaCredito = VentasNotasCredito.findOne({
                ventaOrdenId: doc.ventaOrdenId,
                numNotaCredito: {$exists: false}
            });
            if (notaCredito) {
                const notaCreditoId = VentasNotasCredito.insert({
                    ventaOrdenId: doc.ventaOrdenId,
                    tiendaId: doc.tiendaId,
                });
                VentasCancelaciones.update({_id: doc._id}, {$set: {notaCreditoId: notaCreditoId}});

            } else {
                VentasCancelaciones.update({_id: doc._id}, {$set: {notaCreditoId: notaCredito._id}});
            }
        }

    },

    afterInsertVentasCanclcns(doc) {

        this._insertVentasNotas(doc);
    }
};

export default ventasCancelacionesHooks;