/**
 * Created by Héctor on 19/06/2017.
 */
import {Session} from "meteor/session";
import {Productos} from "../../../../api/catalogos/productos/collection";
import {Marcas} from "../../../../api/catalogos/marcas/collection";
import {name as CrearVentaOrden} from "./crear/crearVentaOrden";
import {buscarProductoDescp} from "../../../../api/catalogos/productos/busquedas";
import {name as EligeProductoInventarios} from "./eligeProductoInventarios/eligeProductoInventarios";

import template from "./menudeo.html";

class Menudeo {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.prodSelec = '';
        this.tiendaId = Session.get('estacionTrabajoId');

        this.subscribe('productos.id', () => [{_id: this.getReactively('prodSelec._id')}]);
        this.subscribe('marcas.id', () => [{_id: this.getReactively('prodSelec.marcaId')}]);

        this.helpers({
            marca() {
                return Marcas.findOne();
            },
            producto() {
                return Productos.findOne();
            },
        });
    }

    abrirModal($item, $model, $label, $event) {

        let productoFinal = $model;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "EligeProductoInventarios",
            size: 'lg',
            resolve: {
                producto: function () {
                    return productoFinal;
                }

            }
        }).result.then(this.$bindToContext((result) => {
            console.log(result);
        }, function (reason) {
            console.log(reason);
        }));
    }

    buscarProducto(valor) {
        return buscarProductoDescp.callPromise({
            codigo: valor
        }).then(this.$bindToContext((result) => {
            return result;
        }));
    }
}

const name = 'menudeo';

export default angular
    .module(name, [
        EligeProductoInventarios,
        CrearVentaOrden
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Menudeo
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.ventas.menudeo', {
            url: '/menudeo',
            template: '<menudeo></menudeo>'
        });
}

