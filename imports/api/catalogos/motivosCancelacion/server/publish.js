/**
 * Created by jvltmtz on 17/11/17.
 */

import {Meteor} from "meteor/meteor";
import {MesesIntereses} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('motivosCancelacion.lista', function (filter) {

        return MesesIntereses.find({}, {fields: {activo: 0}});

    });
}