/**
 * Created by jvltmtz on 6/06/17.
 */
import {Mongo} from "meteor/mongo";
import {Ventas} from "../../ventas/collection";
import {Empleados} from "../../empleados/collection";
import {Clientes} from "../../clientes/collection";

class VentasNotasCreditoCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        //ventasNotasCreditoHooks.afterUpdateVentsOrdns(selector, modifier, options);
        return result;
    }
}

export const VentasNotasCredito = new VentasNotasCreditoCollection('ventasNotasCredito');

VentasNotasCredito.deny({
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

Schema.ventasNotasCredito = new SimpleSchema({
    _id:                {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId:       {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:           {type: String, regEx: SimpleSchema.RegEx.Id},
    numNotaCredito:     {type: String, optional: true},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    empleadoId:         {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    datosFiscalesId:    {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    total:              {type: Number, defaultValue: 0, decimal: true},
    subTotal:           {type: Number, defaultValue: 0, decimal: true},
    numTotalProductos:  {type: Number, defaultValue: 0, optional: true},
    impresa:            {type: Boolean, optional: true, defaultValue: false},
    notaFiscalId: {type: Number, optional: true},
    tipo: {type: String, optional: true}
});

VentasNotasCredito.attachSchema(Schema.ventasNotasCredito);

VentasNotasCredito.helpers({
    empleado() {
        return Empleados.findOne({_id: this.empleadoId});
    },
    cliente() {
        return Clientes.findOne({_id: this.clienteId});
    }
});