/**
 * Created by Héctor on 11/03/2017.
 */
import "./nombreProducto.html";

class NombreProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    upper(producto) {
        if (producto === null || producto === undefined) {
            this.nombre = producto;
        } else {
            this.nombre = producto.toUpperCase();
        }

    }
}

const name = 'nombreProducto';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/text/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            nombre: '='
        },
        controller: NombreProducto
    });