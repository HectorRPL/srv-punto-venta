/**
 * Created by jvltmtz on 16/08/17.
 */
import {Mongo} from "meteor/mongo";
export const CountersVentas = new Mongo.Collection('countersVentas');

CountersVentas.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});
