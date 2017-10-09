/**
 * Created by Héctor on 09/09/2017.
 */
import {Mongo} from "meteor/mongo";
export const BitacoraLogin = new Mongo.Collection('bitacoraLogin');

BitacoraLogin.deny({
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

Schema.bitacoraLogin = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaLogin: {
        type: Date
    },
    fechaLogout: {
        type: Date,
        optional: true
    },
    conexion: {
        type: Object,
        blackbox: true
    }
});

BitacoraLogin.attachSchema(Schema.bitacoraLogin);