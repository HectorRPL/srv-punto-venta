/**
 * Created by jvltmtz on 6/06/17.
 */
import {Mongo} from "meteor/mongo";
import {Ventas} from "../../ventas/collection";
import {Empleados} from "../../empleados/collection";
import {Clientes} from "../../clientes/collection";
import ventasOrdenesHooks from './ventasOrdenesHooks';

class VentasOrdenesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        ventasOrdenesHooks.afterUpdateVentsOrdns(selector, modifier, options);
        return result;
    }
}

export const VentasOrdenes = new VentasOrdenesCollection('ventasOrdenes');

VentasOrdenes.deny({
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

Schema.ventasOrdenes = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaId:            {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:           {type: String, regEx: SimpleSchema.RegEx.Id},
    mesesSinInteres:    {type: Number, optional: true},
    numVentaOrden:      {type: String, optional: true},
    fechaCreacion:      {type: Date, defaultValue: new Date},
    tipo:               {type: String},
    empleadoId:         {type: String, regEx: SimpleSchema.RegEx.Id},
    clienteId:          {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    direccionEntregaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    datosFiscalesId:    {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    total:              {type: Number, defaultValue: 0, decimal: true},
    subTotal:           {type: Number, defaultValue: 0, decimal: true},
    saldoPorCobrar:     {type: Number, defaultValue: 0, decimal: true},
    totalPagado:        {type: Number, defaultValue: 0, decimal: true},
    numTotalProductos:  {type: Number, defaultValue: 0},
    numTotalCancelados: {type: Number, defaultValue: 0},
    numTotalEntregados: {type: Number, defaultValue: 0},
    impresa:            {type: Boolean, optional: true, defaultValue: false},
    cs:                 {type: Number, optional: true}
});

VentasOrdenes.attachSchema(Schema.ventasOrdenes);

VentasOrdenes.helpers({
    empleado() {
        return Empleados.findOne({_id: this.empleadoId});
    },
    cliente() {
        return Clientes.findOne({_id: this.clienteId});
    }
});