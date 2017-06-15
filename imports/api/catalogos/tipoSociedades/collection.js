/**
 * Created by jvltmtz on 12/05/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const TiposSociedades = new Mongo.Collection('tiposSociedades');

TiposSociedades.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


TiposSociedades.schema = new SimpleSchema({
    _id:                {type: String},
    abreviacion:        {type: String}
});

TiposSociedades.attachSchema(TiposSociedades.schema);