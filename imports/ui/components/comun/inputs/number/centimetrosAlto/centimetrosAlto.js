/**
 * Created by Héctor on 11/03/2017.
 */
import "./centimetrosAlto.html";

class CentimetrosAlto{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'centimetrosAlto';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/number/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            ancho: '='

        },
        controller: CentimetrosAlto
    });