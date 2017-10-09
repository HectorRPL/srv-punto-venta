/**
 * Created by jvltmtz on 26/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const MarcasViejas = new Mongo.Collection('marcasViejas');

MarcasViejas.deny({
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

MarcasViejas.schema = new SimpleSchema({
    marcaId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    _id: {
        type: String,
    }
});

MarcasViejas.attachSchema(MarcasViejas.schema);