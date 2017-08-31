/**
 * Created by jvltmtz on 17/04/17.
 */

import {Mongo} from "meteor/mongo";
export const Counters = new Mongo.Collection('counters');

Counters.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});
