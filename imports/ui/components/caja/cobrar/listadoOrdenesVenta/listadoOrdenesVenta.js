/**
 * Created by Héctor on 13/05/2017.
 */
// import {name as FullScroll} from '../../../directives/fullScroll/fullScroll';
import template from "./listadoOrdenesVenta.html";

class ListadoOrdenesVenta {
    constructor($scope, $stateParams, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.ordenVentaId = $stateParams.ordenVentaId;

        /* ESTO SERÍA LA SUBSCRIPCION */
        this.ordenesVenta = [
            {_id: '01', fecha: '2017.05.12.11:15am', numero: '1565429', nombre: 'HECTOR FLORES VIZUET',                texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'HECTOR'},
            {_id: '02', fecha: '2017.05.12.02:16pm', numero: '2265428', nombre: 'FILIBERTO FLORES RODRIGUEZ',          texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'JESUS'},
            {_id: '03', fecha: '2017.05.12.02:20pm', numero: '4335427', nombre: 'PATRICIA ADELA VIZUET PIEDRA',        texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARINA'},
            {_id: '04', fecha: '2017.05.12.03:45pm', numero: '4544426', nombre: 'TATIANA FLORES VIZUET',               texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'IRENE'},
            {_id: '05', fecha: '2017.05.12.04:59pm', numero: '4565525', nombre: 'ELIZABETH MONSERRAT FLORES VIZUET',   texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'FILIBERTO'},
            {_id: '06', fecha: '2017.05.12.11:15am', numero: '4565664', nombre: 'HECTOR FLORES VIZUET',                texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARIO'},
            {_id: '07', fecha: '2017.05.12.02:16pm', numero: '4565473', nombre: 'FILIBERTO FLORES RODRIGUEZ',          texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARTHA'},
            {_id: '08', fecha: '2017.05.12.02:20pm', numero: '4565422', nombre: 'PATRICIA ADELA VIZUET PIEDRA',        texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'PEDRO'},
            {_id: '09', fecha: '2017.05.12.03:45pm', numero: '4565421', nombre: 'TATIANA FLORES VIZUET',               texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'PEPE'},
            {_id: '10', fecha: '2017.05.12.04:59pm', numero: '4565420', nombre: 'ELIZABETH MONSERRAT FLORES VIZUET',   texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'ROBERTO'},
            {_id: '11', fecha: '2017.05.12.11:15am', numero: '1565429', nombre: 'HECTOR FLORES VIZUET',                texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'HECTOR'},
            {_id: '12', fecha: '2017.05.12.02:16pm', numero: '2265428', nombre: 'FILIBERTO FLORES RODRIGUEZ',          texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'JESUS'},
            {_id: '13', fecha: '2017.05.12.02:20pm', numero: '4335427', nombre: 'PATRICIA ADELA VIZUET PIEDRA',        texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARINA'},
            {_id: '14', fecha: '2017.05.12.03:45pm', numero: '4544426', nombre: 'TATIANA FLORES VIZUET',               texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'IRENE'},
            {_id: '15', fecha: '2017.05.12.04:59pm', numero: '4565525', nombre: 'ELIZABETH MONSERRAT FLORES VIZUET',   texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'FILIBERTO'},
            {_id: '16', fecha: '2017.05.12.11:15am', numero: '4565664', nombre: 'HECTOR FLORES VIZUET',                texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARIO'},
            {_id: '17', fecha: '2017.05.12.02:16pm', numero: '4565473', nombre: 'FILIBERTO FLORES RODRIGUEZ',          texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'MARTHA'},
            {_id: '18', fecha: '2017.05.12.02:20pm', numero: '4565422', nombre: 'PATRICIA ADELA VIZUET PIEDRA',        texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'PEDRO'},
            {_id: '19', fecha: '2017.05.12.03:45pm', numero: '4565421', nombre: 'TATIANA FLORES VIZUET',               texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'PEPE'},
            {_id: '20', fecha: '2017.05.12.04:59pm', numero: '4565420', nombre: 'ELIZABETH MONSERRAT FLORES VIZUET',   texto: 'There are many variations of passages of Lorem Ipsum.', alerta: '$455,000.00',  datos: 'ROBERTO'},
        ];

    }
}

const name = 'listadoOrdenesVenta';

export default angular
    .module(name, [
        // FullScroll
    ])
    .component(name, {
        templateUrl: `imports/ui/components/caja/cobrar/${name}/${name}.html`,
        controllerAs: name,
        controller: ListadoOrdenesVenta
    })
    .directive('fullScroll', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: '650px',
                        railOpacity: 0.9
                    });

                });
            }
        };
    }]);
