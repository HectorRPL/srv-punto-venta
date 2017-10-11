import {Meteor} from "meteor/meteor";
import {VentasEntregas} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('ventasEntregas.lista', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            return VentasEntregas.find(filter, {fields: {fechaCreacion: 0}});
        }
    });
}