/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasOrdenes} from "../collection";
import {Empleados} from "../../../empleados/collection";
import {Clientes} from "../../../clientes/collection";
import {Counts} from "meteor/tmeasday:publish-counts";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasOrdenes.lista', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;

            Counts.publish(this, 'numVentasOrdenes', VentasOrdenes.find(selector), {
                noReady: true
            });
            return {
                find: function () {
                    return VentasOrdenes.find(selector, options);
                },
                children: [
                    {
                        find: function (venta) {
                            return Empleados.find({_id: venta.empleadoId}, {fields: {nombreCompleto: 1}});
                        }
                    },
                    {
                        find: function (venta) {
                            return Clientes.find({_id: venta.clienteId}, {fields: {nombreCompleto: 1}});
                        }
                    }
                ]
            }
        }
    });
}
