/**
 * Created by jvltmtz on 23/06/17.
 */
import {buscarEmpleados} from "../../../../../api/empleados/busquedas"
import template from "./buscarEmpleado.html";

class BuscarEmpleado {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.empleado = '';

    }

    buscar(valor) {
        return buscarEmpleados.callPromise({tiendaId: this.tiendaid, nombre: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarEmpleado';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarEmpleado,
        bindings: {
            tiendaid: '<',
            empleado: '='
        },
    });