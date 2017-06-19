/**
 * Created by Héctor on 15/05/2017.
 */
import {Proveedores} from "../../../../../../../../api/catalogos/bancos/collection";
import {buscarBanco} from "../../../../../../../../api/catalogos/bancos/busquedas";
import "./tarjetaBancaria.html";

class TarjetaBancaria {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    elegirCredito() {
        this.datos.credito = true;
    }
    elegirDebito() {
        this.datos.credito = false;
    }

    buscarBanco(valor) {
        return buscarBanco.callPromise({
            nombre: valor
        }).then(function (result) {
            return result;
        });
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
