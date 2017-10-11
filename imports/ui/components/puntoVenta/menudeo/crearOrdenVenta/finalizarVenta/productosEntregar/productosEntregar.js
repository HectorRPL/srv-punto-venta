/**
 * Created by jvltmtz on 23/08/17.
 */
import {buscarCantidaAlmacen} from '../../../../../../../api/ventas/ordenes/partidas/productos/busquedas';
import {name as ProductosMiInvtr} from "./productosMiInvntr/productosMiInvntr";
import template from './productosEntregar.html';
import {Session} from "meteor/session";
import {crearVentaEntrega,actualizarVentaEntrega} from "../../../../../../../api/ventas/entregas/methods";

class ProductosEntregar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = Session.get('estacionTrabajoId');
        this.entregaMostrarId = '';
    }

    guardar(partida) {
        const entregaFinal = {
            ventaOrdenId: this.ventaOrdenId,
            tiendaId: this.tiendaId,
            partidaId: partida._id,
            tipo: 'mostrador',
            numProductos: partida.prodctsEntregar
        };

        crearVentaEntrega.callPromise(entregaFinal)
            .then(this.$bindToContext((result) => {
                partida.entregaMostrarId = result;
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }

    actualizar(partida){
        const entrega = {
          _id: partida.entregaMostrarId,
          numProductos: partida.numProductos
        };
        actualizarVentaEntrega.callPromise(entrega)
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'dandger';
            }))
    }

}

const name = 'productosEntregar';

export default angular
    .module(name, [
        ProductosMiInvtr
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ProductosEntregar,
        bindings: {
            partidas: '<',
            ventaOrdenId: '<'
        }
    })
    .directive('cantidadInvalida', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.cantidadInvalida = function (modelValue, viewValue) {
                    let cantidad = modelValue || viewValue;
                    const partidaId = element[0].id;
                    const proveedorId = scope.productosEntregar.tiendaId;
                    return buscarCantidaAlmacen.callPromise({
                        partidaId: partidaId,
                        proveedorId: proveedorId
                    }).then(function (result) {
                        console.log(result);
                        if (cantidad > result) {
                            return $q.reject('Cantidad a entregar no valida');
                        }
                    }).catch(function (err) { // cacha el error (¿dos veces?)
                        console.log(err);
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);