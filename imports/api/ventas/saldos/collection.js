/**
 * Created by jvltmtz on 15/09/17.
 */
import {Mongo} from "meteor/mongo";
import ventasSaldosHooks from "./ventasSaldosHooks";

class VentasSaldosCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        ventasSaldosHooks._afterUpdateVentsSalds(selector, modifier, options);

        return result;
    }
}

export const VentasSaldos = new VentasSaldosCollection('ventasSaldos');

VentasSaldos.deny({
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

Schema.ventasSaldos = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    total: {type: Number, decimal: true, defaultValue: 0.0},
    subTotal: {type: Number, decimal: true, defaultValue: 0.0},
    saldoCobrar: {type: Number, decimal: true, defaultValue: 0.0},
    totalPagos: {type: Number, decimal: true, defaultValue: 0.0},
    fechaCreacion: {type: Date, defaultValue: new Date},
    iva: {type: Number, optional: true}
});

VentasSaldos.attachSchema(Schema.ventasSaldos);

