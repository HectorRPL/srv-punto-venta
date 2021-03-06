/**
 * Created by jvltmtz on 24/08/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Marcas = new Mongo.Collection('marcas');

Marcas.deny({
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

Marcas.schema = new SimpleSchema({
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
        // regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 50,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    }
});

Marcas.attachSchema(Marcas.schema);