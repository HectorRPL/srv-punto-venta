/**
 * Created by jvltmtz on 6/06/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {VentasOrdenes} from "./collection";
import {_} from "meteor/underscore";

export const altaOrdenVenta = new ValidatedMethod({
    name: 'ordenesVentas.altaOrdenVenta',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        numMeses: {type: Number}
    }).validator(),
    run({tiendaId, ventaId, numMeses}) {
        const orden = {
            ventaId: ventaId,
            tiendaId: tiendaId
        };
        if(numMeses > 0){
            orden.mesesSinInteres = numMeses;
        }
        return VentasOrdenes.insert(orden, (err)=>{
            if(err){
                console.log("Error al crear la orden de venta ", ventaId, tiendaId);
            }
        });
    }
});


const ORDENES_VENTAS_METHODS = _.pluck(
    [

    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(ORDENES_VENTAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}