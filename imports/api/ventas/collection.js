/**
 * Created by jvltmtz on 19/07/17.
 */
import {Mongo} from "meteor/mongo";
export const Ventas = new Mongo.Collection('ventas');

Ventas.deny({
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

Schema.ventas = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
});

Ventas.attachSchema(Schema.ventas);