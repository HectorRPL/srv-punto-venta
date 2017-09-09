/**
 * Created by Héctor on 11/05/2017.
 */
import {name as Cobrar} from './cobrar/cobrar';
import template from "./caja.html";

class Caja {
    constructor() {
        'ngInject';
    }

}

const name = 'caja';

export default angular
    .module(name, [
        Cobrar
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Caja
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.caja', {
            url: '/caja',
            template: '<caja></caja>',
            abstract: true
        });
}