/**
 * Created by jvltmtz on 13/06/17.
 */
import {altaCliente} from '../../../../../api/clientes/methods';
import {cambiosCliente} from '../../../../../api/ordenesVentas/methods';
import {name as Alertas} from '../../../comun/alertas/alertas';
import './asignarCliente.html';

class AsignarCliente {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.datos = {};
        this.ordenId = $stateParams.ordenId;
    }

    insertarCliente() {
        altaCliente.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.tipoMsj = 'danger';
                this.msj = 'Erro al crear al cliente, intentar mas tarde';
            } else {
                this.asignarCliente(result);
            }
        }));
    }

    asignarCliente(clienteId) {

        cambiosCliente.call({ordenId: this.ordenId, clienteId: clienteId}, this.$bindToContext((err)=> {
            if (err) {
                this.tipoMsj = 'danger';
                this.msj = 'Erro al crear al cliente, intentar mas tarde';
            } else {
                this.state.go('app.crearventa.direccion', {clienteId: clienteId})
            }
        }));

    }

}

const name = 'asignarCliente';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/crearOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: AsignarCliente
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.crearventa.cliente', {
            url: '/cliente',
            template: '<asignar-cliente></asignar-cliente>'
        });
}