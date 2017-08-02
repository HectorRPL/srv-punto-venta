/**
 * Created by jvltmtz on 17/07/17.
 */

import {Meteor} from "meteor/meteor";
import {MesesIntereses} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('mesesIntereses.todos', function (filter) {

        return MesesIntereses.find({}, {fields: {activo: 0}});

    });
}