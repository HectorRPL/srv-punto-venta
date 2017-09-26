/**
 * Created by jvltmtz on 13/06/17.
 */
import {actualizarVentaCliente} from '../../../../../../api/ventas/ordenes/methods';
import {name as Alertas} from '../../../../comun/alertas/alertas';
import {name as BuscarCliente} from '../../../../comun/busquedas/buscarCliente/buscarCliente';
import {name as AltaCliente} from '../../../../clientes/altaCliente/altaCliente';
import {name as CambiosCliente} from '../../../../clientes/cambiosCliente/cambiosCliente';
import {crearCliente, actualizarCliente} from '../../../../../../api/clientes/methods';
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
                return Clientes.findOne({_id: this.getReactively('clienteSelec._id')}) || {};
            }
        });
    }

    agregarCliente() {
        crearCliente.callPromise(this.cliente)
            .then(this.$bindToContext((result)=> {
                return result;
            }))
            .then(this.$bindToContext((clienteId)=> {
                this.clienteId = clienteId;
                return actualizarVentaCliente.callPromise({ventaId: this.ventaId, clienteId: clienteId});
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app.venta.orden.entrega.domicilio', {clienteId: this.clienteId});
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = 'Erro al crear al cliente, intentar mas tarde';
            }));
    }

    actualizarCliente() {
        delete this.cliente.nombreCompleto;
        actualizarCliente.callPromise(this.cliente)
            .then(this.$bindToContext((result)=> {
                 return this.cliente._id;
            }))
            .then(this.$bindToContext((clienteId)=> {
                return actualizarVentaCliente.callPromise({ventaId: this.ventaId, clienteId: clienteId});
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app.venta.orden.entrega.domicilio', {clienteId: this.cliente._id});
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err);
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
        template: template.default,
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