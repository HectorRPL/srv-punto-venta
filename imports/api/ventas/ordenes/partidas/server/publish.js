/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasPartidasOrdenes} from "../collection";
import {Productos} from "../../../../catalogos/productos/collection";
import {Marcas} from "../../../../catalogos/marcas/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasPartidasOrdenes.lista', function (filter, options) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            options.fields = {
                numProductos: 1, precioFinal: 1, productoId: 1,
                numEntregados: 1, numCancelados: 1, ventaOrdenId: 1
            };

            return {
                find: function () {
                    return VentasPartidasOrdenes.find(selector, options);
                },
                children: [
                    {
                        find: function (partida) {
                            return Productos.find({_id: partida.productoId}, {
                                fields: {
                                    campoBusqueda: 1,
                                    unidad: 1,
                                    marcaId: 1
                                }
                            });
                        },
                        children: [
                            {
                                find: function (producto) {
                                    return Marcas.find({_id: producto.marcaId}, {fields: {nombre: 1}});
                                }
                            }
                        ]
                    }
                ]
            };
        }
    });
}