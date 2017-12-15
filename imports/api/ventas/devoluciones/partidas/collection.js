/**
 * Created by jvltmtz on 30/11/17.
 */
import {Mongo} from "meteor/mongo";
import {_} from 'meteor/underscore';
import {Productos} from "../../../catalogos/productos/collection"

class VentasDevolucionesPartidasCollection extends Mongo.Collection {
    insert(doc, callback) {

        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {

        const result = super.update(selector, modifier, options, callback);
        return result;
    }
}
export const VentasDevolucionesPartidas = new VentasDevolucionesPartidasCollection('ventasDevolucionesPartidas');

VentasDevolucionesPartidas.deny({
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

Schema.ventasDevolucionesPartidas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    devolucionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional:true},
    cancelacionId: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaPartidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    iva: {type: Number},
    precioBase: {type: Number, decimal: true},
    precioFinal: {type: Number, decimal: true},
    numProductos: {type: Number},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },

});

VentasDevolucionesPartidas.attachSchema(Schema.ventasDevolucionesPartidas);