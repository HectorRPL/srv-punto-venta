/**
 * Created by Héctor on 07/03/2017.
 */
import {Mongo} from "meteor/mongo";
export const Clientes = new Mongo.Collection('clientes');

Clientes.deny({
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

Schema.clientes = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    nombres: {
        type: String, min: 2, max: 30, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
            return this.value.toUpperCase();
        }
    },
    apellidos: {
        type: String, min: 2, max: 45, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
                return this.value.toUpperCase();
        }
    },
    nombreCompleto: {
        type: String,
        autoValue: function () {
            let nombreCompleto = '';
            if (this.field('nombres').value && this.field('apellidos').value) {
                nombreCompleto += this.field('nombres').value.toUpperCase();
                nombreCompleto += ' ' + this.field('apellidos').value.toUpperCase();
                return nombreCompleto;
            }
        }
    },
    email: {
        type: String, min: 2, max: 30, regEx: SimpleSchema.RegEx.Email
    },
    sexo: {type: String},
    telefono: {type: Number, optional: true},
    celular: {type: Number, optional: true}
});

Clientes.attachSchema(Schema.clientes);
