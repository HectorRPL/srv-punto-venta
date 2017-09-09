/**
 * Created by jvltmtz on 3/07/17.
 */
import template from "./confirmarOperacion.html";

class ConfirmarOperacion {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Confirmar';
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }
}

const name = 'confirmarOperacion';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ConfirmarOperacion,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });