/**
 * Created by jvltmtz on 8/06/17.
 */
import {Mongo} from "meteor/mongo";
import {ProductosInventarios} from "../../../../inventarios/productosInventarios/collection";
import {VentasOrdenes} from "../../../../ventas/ordenes/collection";
import {Tiendas} from "../../../../catalogos/tiendas/collection";
import {Proveedores} from "../../../../catalogos/proveedores/collection";
import productosPartidasHooks from "./productosPartidasHooks";

class VentasProductosPartidasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        return result;
    }
}
export const VentasProductosPartidas = new VentasProductosPartidasCollection('ventasProductosPartidas');

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
    compraOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    descontado: {type: Boolean, optional: true}
});

VentasProductosPartidas.attachSchema(Schema.ventasProductosPartidas);

VentasProductosPartidas.helpers({
    pedido(){
        return ProductosInventarios.findOne({_id: this.productoInventarioId});
    },
    orden(){
        return VentasOrdenes.findOne({_id: this.ventaOrdenId});
    },
    proveedor(){
        if (this.tiendaGrupo) {
            return Tiendas.findOne({_id: this.proveedorId});
        } else {
            return Proveedores.findOne({_id: this.proveedorId});
        }
    },
    tiendaOrigen(){
        return Tiendas.findOne({_id: this.tiendaOrigenId});
    }
});