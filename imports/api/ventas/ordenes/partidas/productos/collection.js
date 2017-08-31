/**
 * Created by jvltmtz on 8/06/17.
 */
import {Mongo} from "meteor/mongo";
export const VentasProductosPartidas = new Mongo.Collection('ventasProductosPartidas');

VentasProductosPartidas.deny({
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

Schema.ventasProductosPartidas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaOrigenId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaProveedorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoInventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    numProductos: {type: Number},
    pedidoRealizado: {type: Boolean, defaultValue: false},
    fechaCreacion: {type: Date, defaultValue: new Date, denyUpdate: true}

});

VentasProductosPartidas.attachSchema(Schema.ventasProductosPartidas);