/**
 * Created by Héctor on 25/07/2017.
 */
import {name as Alertas} from "../../../alertas/alertas";
import {name as FormaDireccion} from "../../../formas/formaDireccion/formaDireccion";
import {cambiosDireccion} from "../../../../../../api/direcciones/methods";
import template from "./cambiosDireccion.html";

class CambiosDireccion {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);
        this.direccion = {};

        this.tipoMsj = '';

    }


    actualizar(cambiosDireccionFrm) {
        this.tipoMsj = '';
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        delete direccionFinal.fechaCreacion;

        cambiosDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(cambiosDireccionFrm);
        })).catch(this.$bindToContext((err) => {
            console.log('[48]', err);
            this.tipoMsj = 'danger';
        }));
    }

    limpiarCampos(cambiosDireccionFrm) {
        this.datosFiscalesOriginal = {};
        cambiosDireccionFrm.$setPristine();
    }
}

const name = 'cambiosDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: CambiosDireccion,
        bindings: {
            direccion: '<'
        }
    });