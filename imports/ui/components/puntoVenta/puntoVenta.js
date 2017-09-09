/**
 * Created by Héctor on 06/03/2017.
 */
import template from "./puntoVenta.html";
import {name as Menudeo} from "./menudeo/menudeo";

class PuntoVenta {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'puntoVenta';

export default angular
    .module(name, [
        Menudeo,
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PuntoVenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta', {
            url: '/venta',
            template: '<punto-venta></punto-venta>',
            abstract: true
        });
}