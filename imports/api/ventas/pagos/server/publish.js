/**
 * Created by Héctor on 14/08/2017.
 */
import {Meteor}         from "meteor/meteor";
import {VentasPagos}    from "../collection";
import {TiposPagos}     from "../../../catalogos/tiposPagos/collection";
import {Bancos}         from "../../../catalogos/bancos/collection";
// import {TiposTarjetas}  from "../../catalogos/tiposTarjetas/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasPagos.totalPagos', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            // options.fields = {inventarioId: 0, fechaCreacion: 0};
            const options = {fields: {_id: 1, monto: 1}};
            Counts.publish(this, `ventasPagos.${filter.ventaOrdenId}.totalPagos`,
                VentasPagos.find(filter, options),
                {
                    noReady: false, countFromField: function (doc) {
                        return (doc.monto);
                    }
                }
            );

            const optListaPagos = {fields: {_id: 1, monto: 1, tipoPagoId: 1, bancoId: 1, tipoTarjetaId: 1, referencia: 1}};
            return {
                find: function () {
                    return VentasPagos.find(selector, optListaPagos);
                },
                children: [
                    {
                        find: function (pago) {
                            return TiposPagos.find({_id: pago.tipoPagoId}, {fields: {descripcion: 1}});
                        },
                        find: function (banco) {
                            if (banco.bancoId) {
                                return Bancos.find({_id: banco.bancoId}, {fields: {nombre: 1}});
                            }
                        },
                        // TODO: No sé porque no puede vivir el 'find: Bancos' y el 'find: TiposTarjetas', se saltan.
                        // Y estando así funciona, no sé porque funciona, pero funciona y me está pintando
                        // visa / master card en el html
                        /*
                        find: function (tipoTarjeta) {
                            console.log('[47]', tipoTarjeta);
                            if (tipoTarjeta.tipoTarjetaId) {
                                return TiposTarjetas.find({_id: tipoTarjeta.tipoTarjetaId}, {fields: {nombre: 1}});
                            }
                        }
                        */
                    }
                ]
            }
        }
    });
}