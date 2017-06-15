/**
 * Created by jvltmtz on 25/05/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Promociones = new Mongo.Collection('promociones');

Promociones.deny({
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

Promociones.schema = new SimpleSchema({
    _id:            {type:  String, regEx: SimpleSchema.RegEx.Id},
    nombre:         {type:  String},
    descuento:      {type:  Number, min:1, max:99},
    fechaCreacion:  {type:  Date,   defaultValue: new Date(), denyUpdate: true},
    fechaInicio:    {type:  Date},
    fechaFin:       {type:  Date}
});

Promociones.attachSchema(Promociones.schema);
