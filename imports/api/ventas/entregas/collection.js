/**
 * Created by jvltmtz on 25/08/17.
 */
import {Mongo} from "meteor/mongo";
import ventasEntregasHooks from './ventasEntregasHooks';

class VentasEntregasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback){
        const result = super.update(selector, modifier, options, callback);
        ventasEntregasHooks.afterUpdateVentsEntrgs(selector, modifier, options);
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
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    fechaEntrega: {type: Date, optional: true},
    numProductos: {type: Number},
    empleadoEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    empleadoCreaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    observaciones: {type: String, optional: true},
    numProductosRechzds: {type: Number, optional: true},
    tipo: {type: String, defaultValue: 'domicilio'}
});

VentasEntregas.attachSchema(Schema.ventasEntregas);
