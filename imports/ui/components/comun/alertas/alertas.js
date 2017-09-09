/**
 * Created by jvltmtz on 8/12/16.
 */
import template from "./alertas.html";

class Alertas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.dangerMsj = 'Error al realizar la operación.';
        this.successMsj = 'Éxito al realizar la operación.'
    }
}

const name = 'alertas';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            mensaje: '<',
            tipo: '='
        },
        controller: Alertas
    });
