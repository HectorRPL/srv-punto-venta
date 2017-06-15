/**
 * Created by jvltmtz on 6/06/17.
 */
import {Mongo} from "meteor/mongo";
export const OrdenesVentas = new Mongo.Collection('ordenesVentas');

OrdenesVentas.deny({
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

Schema.ordenesVentas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    clienteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    direccionEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    vendedorId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    subTotal: {type: Number, decimal: true},
    importeIva: {type: Number, decimal: true},
    total: {type: Number, decimal: true},
    numeroVenta: {type: Number, defaultValue: 0},
    factura: {type: Boolean, defaultValue: false},
    estado: {type: Number, defaultValue: 0},
    mesesIntereses: {type: Boolean, defaultValue: false},
    ventaMayoreo: {type: String, defaultValue: '0'}

});

OrdenesVentas.attachSchema(Schema.ordenesVentas);