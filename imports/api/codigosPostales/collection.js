/**
 * Created by Héctor on 07/03/2017.
 */
import { Mongo } from 'meteor/mongo';
export const CodigosPostales = new Mongo.Collection('codigosPostales');

CodigosPostales.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});
