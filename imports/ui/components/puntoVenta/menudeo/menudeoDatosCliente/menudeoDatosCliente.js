/**
 * Created by Héctor on 27/09/2017.
 */
import {Clientes} from "../../../../../api/clientes/collection";
import template from "./menudeoDatosCliente.html";

class MenudeoDatosCliente {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('clientes.todos', () => [{_id: this.getReactively('cliente._id')}]);
        this.helpers({
            cliente() {
                return Clientes.findOne({_id: this.getReactively('cliente._Id')});
            }
        });
    }
}

const name = 'menudeoDatosCliente';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MenudeoDatosCliente,
        bindings: {
            cliente: '<'
        }
    });