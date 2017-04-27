/**
 * Created by Héctor on 06/03/2017.
 */
import './listadoProductos.html';

class NotaFactura {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            listadoDeProductos() {
                return this.pedido
            }
        });


    }

}

const name = 'listadoProductos';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/tabsNotaFacDev/${name}/${name}.html`,
        controllerAs: name,
        controller: NotaFactura,
        bindings: {
            pedido: '<'
        }
    });

