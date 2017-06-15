/**
 * Created by Héctor on 12/05/2017.
 */
import {name as Efectivo} from './tipos/efectivo/efectivo';
import {name as TarjetaBancaria} from './tipos/tarjetaBancaria/tarjetaBancaria';
import "./formasPago.html";

class FormasPago {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'formasPago';

export default angular
    .module(name, [
        Efectivo,
        TarjetaBancaria
    ])
    .component(name, {
        templateUrl: `imports/ui/components/caja/cobrar/cobrarOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: FormasPago,
        bindings: {
            pagos: '=',
            datos: '='
        }
    });