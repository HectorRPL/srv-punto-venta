/**
 * Created by Héctor on 18/07/2017.
 */
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";
import template from "./menudeoNotaFactura.html";

class MenudeoNotaFactura {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('datosFiscales.propietario', () => [{_id: this.getReactively('datosFiscalesId')}]);
        this.helpers({
            datosFiscales() {
                return DatosFiscales.findOne({_id: this.getReactively('datosFiscalesId')});
            }
        });
    }
}

const name = 'menudeoNotaFactura';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MenudeoNotaFactura,
        bindings: {
            datosFiscalesId: '<'
        }
    });