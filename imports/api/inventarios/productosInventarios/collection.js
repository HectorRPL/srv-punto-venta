/**
 * Created by jvltmtz on 7/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Tiendas} from "../../catalogos/tiendas/collection"
import {Factores} from "../../factores/collection"
import {Promociones} from "../../promociones/collection"

export const ProductosInventarios = new Mongo.Collection('productosInventarios');

ProductosInventarios.deny({
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

Schema.productosInventarios = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    inventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    marcaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    cantidad: {type: Number, defaultValue: 0},
    costo: {type: Number, decimal: true},
    promocionId: {type: String, regEx: SimpleSchema.RegEx.Id},
    comisionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

ProductosInventarios.attachSchema(Schema.productosInventarios);

ProductosInventarios.helpers({
    tienda(){
        return Tiendas.findOne({_id: this.tiendaId});
    },
    precioUno(){
        let precio = 0.0;
        const factor = Factores.findOne({_id: this.factorId});
        if (factor) {
            precio = this.costo * factor.factor1;
        }
        return precio;
    },
    precioMeses(){
        let precio = 0.0;
        const factor = Factores.findOne({_id: this.factorId});
        if (factor) {
            precio = this.costo * factor.factor7;
        }
        return precio;
    },
    //Validar fecha final del descuento.
    descuentoPromo(){
        let descuento = 0;
        if (this.promocionId) {
            const desc = Promociones.findOne({_id: this.promocionId});
            if (desc) {
                descuento = desc.descuento;
            }
        }
        return descuento;
    },
    precioDescuento(){
        let precio = 0;
        if (this.promocionId) {
            const promo = Promociones.findOne({_id: this.promocionId});
            if (promo) {
                if (promo.precioLista) {
                    const factor = Factores.findOne({_id: this.factorId});
                    if(factor){
                        precio = (this.costo * factor.factor1) * (1 - (promo.descuento / 100));
                    }
                } else {
                    precio = this.costo * (1 - (promo.descuento / 100));
                }
            }
        }
        return precio;
    }
});

