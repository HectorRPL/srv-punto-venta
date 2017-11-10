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
        ventasPartidasHooks.afterInsertPartidas(doc);
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
    iva: {type: Number},
    precioBase: {type: Number, decimal: true},
    precioFinal: {type: Number, decimal: true},
    numProductos: {type: Number},
    descuento: {type: Number, optional:true},
    comision: {type: Number, decimal: true, optional: true},
    numEntregados:        {type: Number,  defaultValue: 0},
    numCancelados:        {type: Number,  defaultValue: 0},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true}

});

VentasPartidasOrdenes.attachSchema(Schema.ventasPartidasOrdenes);

VentasPartidasOrdenes.helpers({

    producto(){
        return Productos.findOne({_id: this.productoId});
    }
});