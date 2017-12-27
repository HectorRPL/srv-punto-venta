/**
 * Created by Héctor on 19/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {VentasCancelaciones} from "../collection";
import {Empleados} from "../../../empleados/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasCancelaciones.lista',
        function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;

            Counts.publish(this, 'numVentasCancelaciones', VentasCancelaciones.find(selector), {
                noReady: true
            });
            return {
                find: function () {
                    return VentasCancelaciones.find(selector);
                },
                children: [
                    {
                        find: function (ventasCancelacion) {
                            return Empleados.find({_id: ventasCancelacion.empleadoCanceloId}, {fields: {nombreCompleto: 1}});
                        }
                    },
                    {
                        find: function (ventasCancelacion) {
                            return Empleados.find({_id: ventasCancelacion.empleadoAutorizaId}, {fields: {nombreCompleto: 1}});
                        }
                    }
                ]
            }
        }
    });
}
