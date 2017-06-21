/**
 * Created by Héctor on 12/05/2017.
 */
import template from "./efectivo.html";

class Efectivo {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    pagoTotal() {
        this.pago = {};
        this.parcialTotal = true;
    }

    pagoParcial() {
        this.pago = {};
        this.parcialTotal = false;
    }
}

const name = 'efectivo';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/caja/cobrar/cobrarOrdenVenta/formasPago/tipos/${name}/${name}.html`,
        controllerAs: name,
        controller: Efectivo,
        bindings: {
            resumenpago: '='
        }
    });
