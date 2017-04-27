/**
 * Created by Héctor on 07/03/2017.
 */
import { Inventarios } from '../../../../../../api/inventarios/collection';
import './buscarProducto.html';

class BuscarProducto{

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.seleccionado = {};
        this.subscribe('inventarios.todo');
        this.helpers({
            productos() {
                return Inventarios.find({});
            }
        });

    }

    aceptar(productoSelecciondo) {
        this.modalInstance.close(productoSelecciondo);
    }

    cancelar() {
        this.modalInstance.dismiss('Cancelado');
    }

}

const name = 'buscarProducto';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/panelAgregarBuscar/producto/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarProducto,
        bindings: {
            productoselecciondo: '<',
            close: '&',
            dismiss: '&',
            modalInstance: "<",
            resolve: "<"
        }
    });
