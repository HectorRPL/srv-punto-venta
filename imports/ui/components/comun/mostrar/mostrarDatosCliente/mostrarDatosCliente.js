/**
 * Created by Héctor on 27/09/2017.
 */
import {Clientes} from "../../../../../api/clientes/collection";
import template from "./mostrarDatosCliente.html";

class MostrarDatosCliente {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('clientes.todos', () => [{_id: this.getReactively('clienteId')}]);
        this.helpers({
            cliente() {
                return Clientes.findOne({_id: this.getReactively('clienteId')});
            }
        });
    }
}

const name = 'mostrarDatosCliente';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MostrarDatosCliente,
        bindings: {
            clienteId: '<'
        }
    });