/**
 * Created by jvltmtz on 14/06/17.
 */
import {Meteor} from "meteor/meteor";
import {VentasPartidasOrdenes} from "../collection";
import {Productos} from "../../../../catalogos/productos/collection";
import {Marcas} from "../../../../catalogos/marcas/collection";
import {VentasProductosPartidas} from "../productos/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasPartidasOrdenes.lista', function (filter, options) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;

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
                    },
                    {
                        find: function (partida) {
                            return VentasProductosPartidas.find({partidaId: partida._id}, {
                                fields: {
                                    partidaId: 1,
                                    tiendaOrigenId: 1,
                                    proveedorId: 1,
                                    numProductos: 1
                                }
                            });
                        }
                    }
                ]
            };
        }
    });
}