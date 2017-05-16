/**
 * Created by Héctor on 12/05/2017.
 */
import "./efectivo.html";

class Efectivo {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    pagoTotal() {
        this.parcialTotal = 1;
    }

    pagoParcial() {
        this.parcialTotal = 2;
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
