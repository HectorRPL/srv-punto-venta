/**
 * Created by Héctor on 09/09/2017.
 */
import {Mongo} from "meteor/mongo";
export const Counters = new Mongo.Collection('counters');

Counters.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});
