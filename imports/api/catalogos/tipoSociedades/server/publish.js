/**
 * Created by jvltmtz on 12/05/17.
 */
import {Meteor} from "meteor/meteor";
import {TiposSociedades} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tiposSociedades.todo', function () {
        return TiposSociedades.find();
    });
}