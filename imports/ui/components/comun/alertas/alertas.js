/**
 * Created by jvltmtz on 8/12/16.
 */
import template from "./alertas.html";

class Alertas {
    constructor() {

    }
}

const name = 'alertas';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            mensaje: '<',
            tipo: '='
        },
        controller: Alertas
    });
