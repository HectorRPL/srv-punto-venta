/**
 * Created by Héctor on 30/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const Inventarios = new Mongo.Collection('inventarios');

Inventarios.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.inventarios = new SimpleSchema({
    _id:                {type: String,  regEx: SimpleSchema.RegEx.Id},
    tiendaId:           {type: String,  regEx: SimpleSchema.RegEx.Id},
    ultimaOrdenCompra:  {type: String,  optional: true},
    fechaCreacion:      {type: Date,    defaultValue: new Date(), denyUpdate: true},
    actualizacion:      {type: Date,    optional: true}
});

Inventarios.attachSchema(Schema.inventarios);