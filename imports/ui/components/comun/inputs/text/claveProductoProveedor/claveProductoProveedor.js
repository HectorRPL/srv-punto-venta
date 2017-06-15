/**
 * Created by Héctor on 11/03/2017.
 */
import "./claveProductoProveedor.html";

class ClaveProductoProveedor {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    upper(codigo) {
        if (codigo === null || codigo === undefined) {
            this.codigo = codigo;
        } else {
            this.codigo = codigo.toUpperCase();
        }

    }
}

const name = 'claveProductoProveedor';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/text/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            codigo: '='
        },
        controller: ClaveProductoProveedor
    });