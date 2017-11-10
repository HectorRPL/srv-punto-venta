/**
 * Created by Héctor on 30/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {VentasProductosPartidas} from "../collection";
import {ProductosInventarios} from "../../../../../inventarios/productosInventarios/collection";
import {Productos} from "../../../../../catalogos/productos/collection";
import {Marcas} from "../../../../../catalogos/marcas/collection";
import {VentasOrdenes} from "../../../../../ventas/ordenes/collection";
import {Empleados} from "../../../../../empleados/collection";
import {Tiendas} from "../../../../../catalogos/tiendas/collection";
import {Proveedores} from "../../../../../catalogos/proveedores/collection";
import {Factores} from "../../../../../factores/collection";

if (Meteor.isServer) {

    Meteor.publishComposite('ventasProductosPartidas.todos', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = {$and: [filter]};

            // Se comentan este option porque yo si necesito traer la fecha de creacion, y al ponerlse '0' ya no lo trae
            // options.fields = {inventarioId: 0, fechaCreacion: 0};

            Counts.publish(this, 'numProdsInventarios', VentasProductosPartidas.find(selector), {
                /*

                TODO: Verificar que todos los Counts tengan el 'noReady':
                 noReady: true  (para cuando exista más código que debe ejecutarse debajo (como los children))
                 noReady: false (para cuando ya no exista más código por debajo para ejecutarse))

                 */

                noReady: true
            });
            return {
                find: function () {
                    return VentasProductosPartidas.find(selector, options);
                },
                children: [
                    {
                        find: function (productoInventario) {
                            return ProductosInventarios.find({_id: productoInventario.productoInventarioId});
                        },
                        children: [
                            {
                                find: function (producto) {
                                    return Productos.find({_id: producto.productoId}, {fields: {campoBusqueda: 1}});
                                }
                            },
                            {
                                find: function (marca) {
                                    return Marcas.find({_id: marca.marcaId}, {fields: {nombre: 1}});
                                }
                            },
                            {
                                find: function (productoInventario) {
                                    return Factores.find({_id: productoInventario.factorId},
                                        {fields: {fechaCreacion: 0, marcaVieja: 0}}
                                    );
                                }
                            }
                        ]
                    },
                    {
                        find: function (productoPartida) {
                            if (productoPartida.tiendaGrupo) {
                                return Tiendas.find({_id: productoPartida.proveedorId}, {fields: {nombre: 1}});
                            } else {
                                return Proveedores.find({_id: productoPartida.proveedorId}, {fields: {nombre: 1}});
                            }

                        }
                    },
                    {
                        find: function (tiendaOrigen) {
                            return Tiendas.find({_id: tiendaOrigen.tiendaOrigenId}, {fields: {nombre: 1}});
                        }
                    },
                    {
                        find: function (ventaOrden) {
                            return VentasOrdenes.find({_id: ventaOrden.ventaOrdenId}, {
                                fields: {
                                    empleadoId: 1,
                                    noOrden: 1,
                                    estado: 1
                                }
                            });
                        },
                        children: [
                            {
                                find: function (empleado) {
                                    return Empleados.find({_id: empleado.empleadoId}, {fields: {nombreCompleto: 1}});
                                }
                            }
                        ]
                    }
                ]
            }
        }
    });


    Meteor.publish('ventasProductosPartidas.otroInventario', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const andFilter = {$and: [filter, {deMiInventario: false}, {numCompraOrden: {$exists: false}}]};
            if (filter.ventaOrdenId) {
                Counts.publish(this, `count.productos.otroInventario.${filter.ventaOrdenId}`,
                    VentasProductosPartidas.find(andFilter), {noReady: false});
            } else if (filter.partidaId) {
                Counts.publish(this, `count.productos.otroInventario.${filter.partidaId}`,
                    VentasProductosPartidas.find(andFilter), {noReady: false});
            } else {
                this.ready();
            }

        }
    });

    Meteor.publish('ventasProductosPartidas.MiInventario', function (filter) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const andFilter = {$and: [filter, {deMiInventario: true}]};
            return VentasProductosPartidas.find(andFilter, {options: {numProductos: 1}});
        }
    });
}