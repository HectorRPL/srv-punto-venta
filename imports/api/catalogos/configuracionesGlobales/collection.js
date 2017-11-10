/**
 * Created by Héctor on 20/10/2017.
 */
import {Mongo} from "meteor/mongo";
export const ConfiguracionesGlobales = new Mongo.Collection('configuracionesGlobales');

ConfiguracionesGlobales.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});