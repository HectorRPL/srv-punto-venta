/**
 * Created by Héctor on 18/07/2017.
 */
import template from "./mostrarDatosFiscales.html";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class MostrarDatosFiscales {

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

const name = 'mostrarDatosFiscales';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MostrarDatosFiscales,
        bindings: {
            datosFiscalesId: '<'
        }
    });