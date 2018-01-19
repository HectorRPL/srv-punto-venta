/**
 * Created by Héctor on 19/10/2017.
 */
import {Mongo} from "meteor/mongo";
import ventasCancelacionesHooks from './ventasCancelacionesHooks';
import {Empleados} from '../../empleados/collection';

class VentasCancelacionesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        ventasCancelacionesHooks.afterInsertVentasCanclcns(doc);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        return result;
    }
}

export const VentasCancelaciones = new VentasCancelacionesCollection('ventasCancelaciones');

VentasCancelaciones.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.ventasCancelaciones = new SimpleSchema({
    _id:                {type: String, regEx: SimpleSchema.RegEx.Id},
    partidaId:          {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:           {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId:       {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId:         {type: String, regEx: SimpleSchema.RegEx.Id},
    empleadoCanceloId:  {type: String, regEx: SimpleSchema.RegEx.Id},
    empleadoAutorizaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional:true},
    notaCreditoId:      {type: String, regEx: SimpleSchema.RegEx.Id, optional:true},
    fechaAutorizacion:  {type: Date, optional:true},
    motivo:             {type: String},
    numProductos:       {type: Number},
    numDevoluciones:    {type: Number, defaultValue: 0},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
});

VentasCancelaciones.attachSchema(Schema.ventasCancelaciones);

VentasCancelaciones.helpers({
    empleadoCancelo(){
        return Empleados.findOne({_id: this.empleadoCanceloId});
    },
    empleadoAutorizo(){
        return Empleados.findOne({_id: this.empleadoAutorizaId});
    }
});