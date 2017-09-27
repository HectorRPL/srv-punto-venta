/**
 * Created by Héctor on 27/09/2017.
 */
import {Direcciones} from "../../../../../api/direcciones/collection";
import template from "./mostrarDireccion.html";

class MostrarDireccion {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('direcciones.propietario', () => [{_id: this.getReactively('propietarioId')}]);
        this.helpers({
            direccion() {
                return Direcciones.findOne({_id: this.getReactively('propietarioId')});
            }
        });
    }
}

const name = 'mostrarDireccion';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MostrarDireccion,
        bindings: {
            propietarioId: '<'
        }
    });