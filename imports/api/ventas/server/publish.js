/**
 * Created by jvltmtz on 25/07/17.
 */
import {Ventas} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('ventas.id', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            const options = {fields: {subTotal:1, importeIva:1, total:1, tiendaId: 1}};

            return Ventas.find(selector, options);

        }
    });
}
