/**
 * Created by jvltmtz on 13/06/17.
 */

import {asignarClienteVnt} from '../../../../../../api/ventas/methods';
import {name as Alertas} from '../../../../comun/alertas/alertas';
import {name as BuscarCliente} from '../../../../comun/busquedas/buscarCliente/buscarCliente';
import {name as AltaCliente} from '../../../../clientes/altaCliente/altaCliente';
import {name as CambiosCliente} from '../../../../clientes/cambiosCliente/cambiosCliente';
import {Clientes} from "../../../../../../api/clientes/collection";
import template from './asignarCliente.html';

class AsignarCliente {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.ventaId = $stateParams.ventaId;
        this.clienteSelec = '';
        this.clienteId = '';
        this.subscribe('clientes.todos', ()=> [{_id: this.getReactively('clienteSelec._id')}]);

        this.helpers({
            cliente(){
                return Clientes.findOne({_id: this.getReactively('clienteSelec._id')});
            }
        });
    }


    asignar(clienteId) {

        asignarClienteVnt.callPromise({ventaId: this.ventaId, clienteId: clienteId})
            .then(this.$bindToContext((result)=> {
                console.log(result);
                this.state.go('app.venta.orden.entrega.domicilio', {clienteId: clienteId})
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err)
                this.tipoMsj = 'danger';
                this.msj = 'Erro al crear al cliente, intentar mas tarde';
            }));
    }



}

const name = 'asignarCliente';

export default angular
    .module(name, [
        Alertas,
        BuscarCliente,
        AltaCliente,
        CambiosCliente
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AsignarCliente
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden.cliente', {
            url: '/cliente',
            template: '<asignar-cliente></asignar-cliente>'
        });
}