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
    numVentaOrden: {type: String, defaultValue: '0'},
    cancelada: {type: Boolean, optional: true},
    iva: {type: Number},
    total: {type: Number, decimal: true, defaultValue: 0.0},
    subTotal: {type: Number, decimal: true, defaultValue: 0.0},
    saldoCobrar: {type: Number, decimal: true, defaultValue: 0.0},
    totalPagos: {type: Number, decimal: true, defaultValue: 0.0},
    fechaCreacion: {type: Date, defaultValue: new Date},
    tipo: {type: String},
    empleadoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    clienteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    direccionEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    datosFiscalesId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    entregada: {type: Boolean, defaultValue: false},
    impresa: {type: Boolean, optional: true, defaultValue: false}
});

VentasOrdenes.attachSchema(Schema.ventasOrdenes);