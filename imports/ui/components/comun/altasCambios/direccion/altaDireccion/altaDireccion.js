/**
 * Created by Héctor on 25/07/2017.
 */
import {name as Alertas} from "../../../alertas/alertas";
import {name as FormaDireccion} from "../../../formas/formaDireccion/formaDireccion";
import {altaDireccion} from "../../../../../../api/direcciones/methods";
import template from "./altaDireccion.html";

class AltaDireccion {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.tipoMsj = '';

    }

    insertar() {
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        direccionFinal.propietarioId = this.propietarioId;

        altaDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log('[29]', err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'altaDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AltaDireccion,
        bindings: {
            propietarioId: '='
        }
    });