/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {Direcciones} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('direcciones.propietario', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            return Direcciones.find(filter);
        }

    });
}