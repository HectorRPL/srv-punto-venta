/**
 * Created by jvltmtz on 1/08/17.
 */
import {name as FormaDatosPersonales} from '../../comun/formas/formaDatosPersonales/formaDatosPersonales';
import {cambiosCliente} from '../../../../api/clientes/methods';
import template from './cambiosCliente.html';

class CambiosCliente {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    actualizarCliente() {
        delete this.cliente.nombreCompleto;
        cambiosCliente.callPromise(this.cliente).then(this.$bindToContext((result)=> {
            this.tipoMsj = 'success';
            this.respuestaId({clienteId: this.cliente._id});
        })).catch(this.$bindToContext((err)=> {
            this.tipoMsj = 'danger';
            this.msj = 'Erro al crear al cliente, intentar mas tarde';
        }));
    }

}

const name = 'cambiosCliente';

// create a module
export default angular
    .module(name, [
        FormaDatosPersonales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: CambiosCliente,
        bindings: {
            cliente: '<',
            respuestaId: '&'
        }
    });