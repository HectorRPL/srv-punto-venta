/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {OrdenesVentas} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('ordenesVentas.id', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            const options = {fields: {subTotal:1, importeIva:1, total:1, tiendaId: 1}};

            return OrdenesVentas.find(selector, options);

        }
    });
}
