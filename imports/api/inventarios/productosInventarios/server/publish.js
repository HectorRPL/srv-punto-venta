/**
 * Created by jvltmtz on 19/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ProductosInventarios} from "../collection";
import {Tiendas} from "../../../catalogos/tiendas/collection";
import {Factores} from "../../../factores/collection";
import {Promociones} from "../../../promociones/collection";

if (Meteor.isServer) {
    // Trae t.o.d.o. el inventario
    Meteor.publish('productosInventarios.tiendaMarca', function (filter, options) {
        const selector = {$and: [filter]};
        Counts.publish(this, 'numProdsInventarios', ProductosInventarios.find(selector), {
            noReady: true
        });
        return ProductosInventarios.find(selector, options);
    });

    Meteor.publishComposite('productosInventarios.lista', function (filter, options) {
        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            const selector = filter;
            if (options) {
                options.files = {fields: {marcaId: 0, inventarioId: 0, fechaCreacion: 0}};
            } else {
                options = {fields: {marcaId: 0, inventarioId: 0, fechaCreacion: 0}};
            }


            return {
                find: function () {
                    return ProductosInventarios.find(selector, options);
                },
                children: [
                    {
                        find: function (productoInventario) {
                            return Factores.find({_id: productoInventario.factorId},
                                {fields:{fechaCreacion:0, marcaVieja:0}})
                        }
                    },
                    {
                        find: function (productoInventario) {
                            if(productoInventario.promocionId){

                                return Promociones.find({_id: productoInventario.promocionId},
                                    {fields:{fechaCreacion:0}});
                            }

                        }
                    },
                    {
                        find: function (productoInventario) {
                            return Tiendas.find({_id: productoInventario.tiendaId}, {fields:{nombre:1}});
                        }
                    }
                ]
            }

        }

    });


}