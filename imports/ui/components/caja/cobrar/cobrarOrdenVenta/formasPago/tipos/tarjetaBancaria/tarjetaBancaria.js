/**
 * Created by Héctor on 15/05/2017.
 */
import "./tarjetaBancaria.html";

class TarjetaBancaria {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    credito() {
        this.creditoDebito = 'credito'
    }
    debito() {
        this.creditoDebito = 'debito'
    }
}

const name = 'tarjetaBancaria';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/caja/cobrar/cobrarOrdenVenta/formasPago/tipos/${name}/${name}.html`,
        controllerAs: name,
        controller: TarjetaBancaria,
        bindings: {
            resumenpago: '='
        }
    });
