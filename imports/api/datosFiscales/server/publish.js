/**
 * Created by jvltmtz on 8/08/17.
 */
import {Meteor} from "meteor/meteor";
import {DatosFiscales} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('datosFiscales.propietario', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            return DatosFiscales.find(filter);
        }

    });
}