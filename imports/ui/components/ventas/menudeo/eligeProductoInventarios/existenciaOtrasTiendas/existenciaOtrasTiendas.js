/**
 * Created by Héctor on 16/05/2017.
 */
import {Session} from "meteor/session";
import {_} from "meteor/underscore";
import template from "./existenciaOtrasTiendas.html";
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";

class ExistenciaOtrasTiendas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = Session.get('estacionTrabajoId');

        this.helpers({
            otrosInventarios() {
                return ProductosInventarios.find({
                    tiendaId: {$ne: this.tiendaId},
                    cantidad: {$gt: 0}
                });
            }
        });

    }

    totalProductosTiendas() {
        let sumProds = 0;
        sumProds = _.reduce(this.otrosInventarios, function (total, prod) {
            return total += prod.cantidadSolicitada || 0;
        }, 0);

        this.productos = Array.from(this.otrosInventarios);
        this.totalProductos = sumProds
    }


}

const name = 'existenciaOtrasTiendas';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ExistenciaOtrasTiendas,
        bindings: {
            productos: '=',
            totalProductos: '='
        }
    });
