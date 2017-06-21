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
    nombre: {
        type: String, min: 2, max: 30, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    segundoNombre: {
        type: String, min: 2, max: 30, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    apellidoPaterno: {
        type: String, min: 2, max: 45, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    apellidoMaterno: {
        type: String, optional: true, min: 2, max: 45, regEx: /^[a-zA-ZñÑ\s]+$/,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }

        }
    },
    telefono: {type: Number, optional: true},
    celular: {type: Number, optional: true}

});

Clientes.attachSchema(Schema.clientes);
