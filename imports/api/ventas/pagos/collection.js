/**
 * Created by Héctor on 14/08/2017.
 */
import {Mongo}          from "meteor/mongo";
import {TiposPagos}     from "../../catalogos/tiposPagos/collection";
import {TiposTarjetas}  from "../../catalogos/tiposTarjetas/collection";
import {Bancos}         from "../../catalogos/bancos/collection";
import ventasPagosHooks from "./ventasPagosHooks";
// TODO: ¿lleva el import simpleschema?

class VentasPagosCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        ventasPagosHooks.afterInsertPago(doc);
        return result;
    }

    remove(selector, callback) {
        const result = super.remove(selector, callback);
        ventasPagosHooks.afterRemovePago(selector);
        return result;
    }
}
export const VentasPagos = new VentasPagosCollection('ventasPagos');

VentasPagos.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.ventasPagos = new SimpleSchema({
    _id:           {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:      {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaId:       {type: String, regEx: SimpleSchema.RegEx.Id},
    ventaOrdenId:  {type: String, regEx: SimpleSchema.RegEx.Id},
    tipoPagoId:    {type: String},
    tipoTarjetaId: {type: String, optional: true},
    bancoId:       {type: String, optional: true},
    referencia:    {type: String, optional: true},
    monto:         {type: Number, decimal : true},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true}

});

VentasPagos.attachSchema(Schema.ventasPagos);

VentasPagos.helpers({
    tipoPago(){
        return TiposPagos.findOne({_id: this.tipoPagoId});
    },
    banco(){
        return Bancos.findOne({_id: this.bancoId});
    },
    tipoTarjeta(){
        return TiposTarjetas.findOne({_id: this.tipoTarjetaId});
    }
});

/*
    TODO: Se tiene que importar esta API en srv-punto-venta

 */