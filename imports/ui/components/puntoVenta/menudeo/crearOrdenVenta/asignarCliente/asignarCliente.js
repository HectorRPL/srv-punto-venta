/**
 * Created by jvltmtz on 13/06/17.
 */
import {actualizarVentaCliente} from '../../../../../../api/ventas/ordenes/methods';
import {Clientes} from "../../../../../../api/clientes/collection";
import {crearCliente, actualizarCliente} from '../../../../../../api/clientes/methods';
import {name as Alertas} from '../../../../comun/alertas/alertas';
import {name as BuscarCliente} from '../../../../comun/busquedas/buscarCliente/buscarCliente';
import {name as AltaCliente} from '../../../../clientes/altaCliente/altaCliente';
import {name as CambiosCliente} from '../../../../clientes/cambiosCliente/cambiosCliente';
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
        crearCliente.callPromise(this.cliente).then(this.$bindToContext((result) => {
            console.log('[32][result]', result);
            this.modalInstance.close({clienteId: result});
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
            this.msj = 'Error al crear al cliente, intentar mas tarde.';
        }));
    }

    actualizarCliente() {
        delete this.cliente.nombreCompleto;
        actualizarCliente.callPromise(this.cliente).then(this.$bindToContext((result) => {
            this.modalInstance.close({clienteId: this.cliente._id});
            return this.cliente._id;
        }))
        .catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
            this.msj = 'Erro al crear al cliente, intentar mas tarde';
        }));
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
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
        controller: AsignarCliente,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });