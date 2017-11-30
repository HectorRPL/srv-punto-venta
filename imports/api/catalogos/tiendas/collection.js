/**
 * Created by jvltmtz on 9/03/17.
 */

import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Tiendas = new Mongo.Collection('tiendas');

Tiendas.deny({
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

Tiendas.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    nombre: {
        type: String,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 50,
        autoValue: function () {
            return this.value.toUpperCase()
        }

    },
    telefonos: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    },
    tiendaMatrizId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

Tiendas.attachSchema(Tiendas.schema);