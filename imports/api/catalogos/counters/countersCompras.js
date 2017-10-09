/**
 * Created by Héctor on 22/09/2017.
 */
import {Mongo} from "meteor/mongo";
export const CountersCompras = new Mongo.Collection('countersCompras');

CountersCompras.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});
