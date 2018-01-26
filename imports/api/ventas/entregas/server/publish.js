/**
 * Created by Héctor on 26/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {VentasEntregas} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('ventasEntregas.lista', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            return VentasEntregas.find(selector, {fields: {fechaCreacion: 0}});
        }
    });

    Meteor.publish('ventasEntregas.count', function (filter) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;

            Counts.publish(this, `numPartidasEntregas.${filter.partidaId}`,
                VentasEntregas.find(selector),
                {countFromField: 'numProductos'},
                {noReady: false}
            );
        }
    });
}


