/**
 * Created by jvltmtz on 8/06/17.
 */
import {Mongo} from "meteor/mongo";
import {Productos} from "../../catalogos/productos/collection";
export const PartidasOrdenesVentas = new Mongo.Collection('partidasOrdenesVentas');

PartidasOrdenesVentas.deny({
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

Schema.partidasOrdenesVentas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    ordenVentaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    precioBase: {type: Number, decimal: true},
    precioFinal: {type: Number, decimal: true},
    totalProductos: {type: Number},
    descuento: {type: Number},
    entregado: {type: Boolean, defaultValue: false},
    productosEntregados: {type: Number, defaultValue:0}

});

PartidasOrdenesVentas.attachSchema(Schema.partidasOrdenesVentas);

PartidasOrdenesVentas.helpers({

    producto(){
        return Productos.findOne({_id: this.productoId});
    }
});