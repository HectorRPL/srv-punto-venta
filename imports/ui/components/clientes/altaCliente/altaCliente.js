/**
 * Created by jvltmtz on 26/07/17.
 */
import {name as FormaDatosPersonales} from '../../comun/formas/formaDatosPersonales/formaDatosPersonales';
import {altaCliente} from '../../../../api/clientes/methods';
import template from './altaCliente.html';

class AltaCliente {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    agregarCliente() {
        altaCliente.callPromise(this.cliente).then(this.$bindToContext((result)=> {
            this.tipoMsj = 'success';
            this.respuestaId({clienteId: result});
        })).catch(this.$bindToContext((err)=> {
            this.tipoMsj = 'danger';
            this.msj = 'Erro al crear al cliente, intentar mas tarde';
        }));
    }

}

const name = 'altaCliente';

// create a module
export default angular
    .module(name, [
        FormaDatosPersonales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AltaCliente,
        bindings: {
            respuestaId: '&'
        }
    });