/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasPartidasOrdenes} from "../collection";
import {Productos} from "../../../../catalogos/productos/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasPartidasOrdenes.ordenId', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            const options = {fields: {totalProductos:1, precioFinal:1, productoId:1}};
            return {
                find: function () {
                    return VentasPartidasOrdenes.find(selector, options);
                },
                children: [
                    {
                        find: function (partida) {
                            return Productos.find({_id: partida.productoId}, {fields:{campoBusqueda:1, unidad:1}})
                        }
                    }
                ]
            };
        }
    });
}