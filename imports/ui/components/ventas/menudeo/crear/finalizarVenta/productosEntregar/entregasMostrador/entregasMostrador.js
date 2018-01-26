/**
 * Created by jvltmtz on 01/11/17.
 */
import template from './entregasMostrador.html';
import {Session} from "meteor/session";
import {crearVentEntrg, actualiarEntrgNumProdts} from "../../../../../../../../api/ventas/entregas/methods";
import {buscarCantidaAlmacen} from '../../../../../../../../api/ventas/ordenes/partidas/productos/busquedas';
import {VentasEntregas} from "../../../../../../../../api/ventas/entregas/collection";

class EntregasMostrador {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = Session.get('estacionTrabajoId');
        this.ventaId = $stateParams.ventaId;
        this.subscribe('ventasEntregas.lista', () => [{
            partidaId: this.getReactively('partida._id')
        }]);

        this.helpers({
            entrega() {
                return VentasEntregas.findOne({
                    partidaId: this.getReactively('partida._id'),
                    tipo: 'mostrador'
                });
            }
        });

    }

    guardar(partida) {
        const entrega = {
            ventaOrdenId: partida.ventaOrdenId,
            tiendaId: this.tiendaId,
            partidaId: partida._id,
            numProductos: this.numProductos,
            tipo: 'mostrador'
        };

        crearVentEntrg.callPromise(entrega)
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.tipoMsj = 'danger';
            }));
    }

    actualizar(partida) {
        const entrega = {
            _id: this.entrega._id,
            numProductos: this.numProductos,
        };

        actualiarEntrgNumProdts.callPromise(entrega)
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log('actualizar ', err);
                this.tipoMsj = 'danger';
                this.msj = err.message;
            }))
    }

}

const name = 'entregasMostrador';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EntregasMostrador,
        bindings: {
            partida: '=',
            index: '<'
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
                    const proveedorId = scope.entregasMostrador.tiendaId;
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