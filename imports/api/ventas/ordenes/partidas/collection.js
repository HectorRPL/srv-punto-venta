/**
 * Created by jvltmtz on 8/06/17.
 */
import {Mongo} from "meteor/mongo";
import {_} from 'meteor/underscore';
import {Productos} from "../../../catalogos/productos/collection"
import ventasPartidasHooks from './ventasPartidasHooks';

class VentasPartidasOrdenesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {

        const result = super.update(selector, modifier, options, callback);
        ventasPartidasHooks.afterUpdatePartida(selector, modifier);

        return result;
    }
}
export const VentasPartidasOrdenes = new VentasPartidasOrdenesCollection('ventasPartidasOrdenes');

VentasPartidasOrdenes.deny({
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

Schema.ventasPartidasOrdenes = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    precioBase: {type: Number, decimal: true},
    precioFinal: {type: Number, decimal: true},
    numTotalProductos: {type: Number},
    descuento: {type: Number, optional:true},
    entregada: {type: Boolean, defaultValue: false},
    comision: {type: Number, decimal: true, optional: true},
    cancelada: {type: Boolean, optional: true},
    numTotalEntregados: {type: Number, defaultValue: 0},
    numTotalDevoluciones: {type: Number, optional: true},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true}

});

VentasPartidasOrdenes.attachSchema(Schema.ventasPartidasOrdenes);

VentasPartidasOrdenes.helpers({

    producto(){
        return Productos.findOne({_id: this.productoId});
    }
});