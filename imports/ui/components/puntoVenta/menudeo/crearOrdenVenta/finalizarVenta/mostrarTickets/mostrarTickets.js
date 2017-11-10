/**
 * Created by jvltmtz on 16/08/17.
 */
import {VentasOrdenes} from '../../../../../../../api/ventas/ordenes/collection';
import template from './mostrarTickets.html';

class MostrarTickets {
    constructor($scope, $reactive, $stateParams, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.ventaId = $stateParams.ventaId;

        this.subscribe('ventasOrdenes.lista', () => [{ventaId: this.ventaId}]);

        this.helpers({
            ordenesVenta() {
                return VentasOrdenes.find({ventaId: this.ventaId});
            }
        });
    }

    imprimir() {

    }

}

const name = 'mostrarTickets';

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MostrarTickets
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.finalizar.tickets', {
            url: '/tickets',
            template: '<mostrar-tickets></mostrar-tickets>',
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}