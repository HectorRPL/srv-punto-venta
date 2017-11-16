/**
 * Created by jvltmtz on 15/11/17.
 */
import {Mongo} from "meteor/mongo";

export const MotivosCancelacion = new Mongo.Collection('motivosCancelacion');

MotivosCancelacion.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});