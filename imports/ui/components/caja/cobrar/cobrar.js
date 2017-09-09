/**
 * Created by Héctor on 11/05/2017.
 */
import "jquery-slimscroll/jquery.slimscroll.min";
import {name as ListadoOrdenesVenta} from "./listadoOrdenesVenta/listadoOrdenesVenta";
import {name as CobrarOrdenVenta} from "./cobrarOrdenVenta/cobrarOrdenVenta";
import template from "./cobrar.html";

class Cobrar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'cobrar';

export default angular
    .module(name, [
        ListadoOrdenesVenta,
        CobrarOrdenVenta
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Cobrar
    })
    .config(config)
    // .directive('fullScroll', ['$timeout', function ($timeout) {
    //     return {
    //         restrict: 'A',
    //         link: function(scope, element) {
    //             $timeout(function(){
    //                 element.slimscroll({
    //                     height: '650px',
    //                     railOpacity: 0.9
    //                 });
    //
    //             });
    //         }
    //     };
    // }])
    ;


function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.caja.cobrar', {
            url: '/cobrar',
            template: '<cobrar></cobrar>'
        });
}


