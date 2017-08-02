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
    subTotal: {type: Number, decimal: true, defaultValue: 0.0},
    importeIva: {type: Number, decimal: true, defaultValue: 0.0},
    total: {type: Number, decimal: true, defaultValue: 0.0},
    mesesSinInteres: {type: Number, optional: true},
    estado: {type: Number, defaultValue: 0}

});

VentasOrdenes.attachSchema(Schema.ventasOrdenes);