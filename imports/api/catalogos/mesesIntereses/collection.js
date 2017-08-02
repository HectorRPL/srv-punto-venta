/**
 * Created by jvltmtz on 17/07/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const MesesIntereses = new Mongo.Collection('mesesIntereses');

MesesIntereses.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});