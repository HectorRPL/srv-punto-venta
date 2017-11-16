/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./ventas.html";
import {name as Menudeo} from "./menudeo/menudeo";
import {name as Cancelaciones} from "./cancelaciones/cancelaciones";


class Ventas {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'ventas';

export default angular
    .module(name, [
        Menudeo,
        Cancelaciones
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Ventas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.ventas', {
            url: '/ventas',
            template: '<ventas></ventas>',
            abstract: true
        });
}