/**
 * Created by jvltmtz on 25/08/17.
 */
import {Mongo} from "meteor/mongo";
import partidasOrdenesCount from './entregasCount';

class VentasEntregasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback){
        const result = super.update(selector, modifier, options, callback);
        partidasOrdenesCount.afterUpdateEntrega(selector, modifier);
        return result;
    }
}
export const VentasEntregas = new VentasEntregasCollection('ventasEntregas');

VentasEntregas.deny({
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

Schema.ventasEntregas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    fechaEntrega: {type: Date, optional: true},
    numProductos: {type: Number},
    empleadoEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    empleadoSolicitaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    observaciones: {type: String, optional: true},
    numProductosRechzds: {type: Number, optional: true},
    tipo: {type: String, defaultValue: 'domicilio', optional: true}
});

VentasEntregas.attachSchema(Schema.ventasEntregas);
