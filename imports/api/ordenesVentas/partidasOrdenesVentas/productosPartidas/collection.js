/**
 * Created by jvltmtz on 8/06/17.
 */
import {Mongo} from "meteor/mongo";
export const ProductosPartidas = new Mongo.Collection('productosPartidas');

ProductosPartidas.deny({
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

Schema.productosPartidas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoInventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    numProductos: {type: Number},
    pedidoRealizado: {type:Boolean, defaultValue: false}

});

ProductosPartidas.attachSchema(Schema.productosPartidas);