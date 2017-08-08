/**
 * Created by jvltmtz on 19/07/17.
 */
import {Mongo} from "meteor/mongo";
export const Ventas = new Mongo.Collection('ventas');

Ventas.deny({
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

Schema.ventas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    clienteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    direccionEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    vendedorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    subTotal: {type: Number, decimal: true},
    importeIva: {type: Number, decimal: true},
    total: {type: Number, decimal: true},
    datosFiscalesId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    estado: {type: Number, defaultValue: 0},
    tipo: {type: String}

});

Ventas.attachSchema(Schema.ventas);