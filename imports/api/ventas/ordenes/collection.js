/**
 * Created by jvltmtz on 6/06/17.
 */
import {Mongo} from "meteor/mongo";
export const VentasOrdenes = new Mongo.Collection('ventasOrdenes');

VentasOrdenes.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};

Schema.ventasOrdenes = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    mesesSinInteres: {type: Number, optional: true},
    estado: {type: String, defaultValue: '0'},
    noOrden: {type: String, defaultValue: '0'},
    cancelada:{type: Boolean, optional: true},

});

VentasOrdenes.attachSchema(Schema.ventasOrdenes);