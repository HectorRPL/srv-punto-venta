/**
 * Created by Héctor on 19/10/2017.
 */
import {Mongo} from "meteor/mongo";
import ventasCancelacionesHooks from './ventasCancelacionesHooks';
import {Empleados} from '../../empleados/collection';

class VentasCancelacionesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        ventasCancelacionesHooks.afterInsertComprsCanclcns(doc);
        return result;
    }

    /*update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        return result;
    }*/
}

export const VentasCancelaciones = new VentasCancelacionesCollection('ventasCancelaciones');

VentasCancelaciones.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.ventasCancelaciones = new SimpleSchema({
    _id:               {type: String, regEx: SimpleSchema.RegEx.Id},
    partidaId:         {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:          {type: String, regEx: SimpleSchema.RegEx.Id},
    compraOrdenId:     {type: String, regEx: SimpleSchema.RegEx.Id},
    empleadoCanceloId: {type: String, regEx: SimpleSchema.RegEx.Id},
    observaciones:     {type: String, optional: true},
    numProductos:      {type: Number},
    fechaCreacion:     {type: Date, defaultValue: new Date(), denyUpdate: true}
});

VentasCancelaciones.attachSchema(Schema.ventasCancelaciones);

VentasCancelaciones.helpers({
    empleado(){
        return Empleados.findOne({_id: this.empleadoCanceloId});
    }
});