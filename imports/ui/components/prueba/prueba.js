import {name as IboxTools} from "../comun/iboxTools/iboxTools";
import "./prueba.html";

class Prueba {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

}

const name = 'prueba';

// create a module
export default angular
    .module(name, [
        IboxTools
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Prueba
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.prueba', {
            url: '/prueba',
            template: '<prueba></prueba>'
        });
}
