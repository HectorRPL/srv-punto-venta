import {Meteor} from "meteor/meteor";
import {Promociones} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('pedidos.todo', function (filter) {
        if (Object.keys(selector).length === 0 && selector.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            return Promociones.find(selector);
        }

    });
}