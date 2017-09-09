/**
 * Created by jvltmtz on 25/08/17.
 */
import template from './confirmarImpresion.html';

class ConfirmarImpresion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Confirmar Impresion de Tickets';
        this.msj = {
            tipo:'danger',
            contenido: 'Su pedido no cuenta con direccion de entrega. Ingrese os productos a entregar en mostrador.'
        };
        this.msjDireccion = {
            tipo:'warning',
            contenido: 'El pedido se entrega en domicilio. Si desea entregar productos en mostrador, ingreselos en al pantalla anteriror.'
        };
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }
}

const name = 'confirmarImpresion';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ConfirmarImpresion,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });