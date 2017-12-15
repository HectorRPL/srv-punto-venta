/**
 * Created by jvltmtz on 15/09/16.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Direcciones = new Mongo.Collection('direcciones');

Direcciones.deny({
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

Schema.direcciones = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietarioId: {
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
    calle: {
        type: String,
        max: 50,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    delMpio: {
        type: String,
        max: 30,
        min: 1,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    estado: {
        type: String,
        max: 30,
        min: 1,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    estadoId: {
        type: String,
        max: 3,
        min: 1,
        regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    colonia: {
        type: String,
        max: 50,
        min: 1,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    codigoPostal: {
        type: String,
        max: 5,
        min: 5,
        regEx: /^[0-9]{5}$/
    },
    codigoPais: {
        type: String,
        max: 2,
        min: 2,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        defaultValue: 'MX',
    },
    numExt: {
        type: String,
        max: 10,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    numInt: {
        type: String,
        max: 10,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    }
});

Direcciones.attachSchema(Schema.direcciones);