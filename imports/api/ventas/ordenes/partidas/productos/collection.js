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
    proveedorId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    productoInventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    numProductos: {type: Number},
    deMiInventario: {type: Boolean, optional: true},
    fechaCreacion: {type: Date, defaultValue: new Date, denyUpdate: true},
    tiendaGrupo: {type: Boolean, optional: true},
    numCompraOrden: {type: String, optional: true},
    descontado: {type: Boolean, optional: true}

});

VentasProductosPartidas.attachSchema(Schema.ventasProductosPartidas);