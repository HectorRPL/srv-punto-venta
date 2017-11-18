/**
 * Created by Héctor on 06/04/2017.
 */
import template from "./formaDatosFiscales.html";
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";

class FormaDatosFiscales {
    constructor($scope) {
        'ngInject';
    }
}

const name = 'formaDatosFiscales';

export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    })
    .directive('buscarRfc', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existerfc = function (modelValue, viewValue) {
                    let rfc = modelValue || viewValue;
                    return buscarRfc.callPromise({
                        rfc: rfc
                    }).then(function (result) {
                        if (result.length > 0) {
                            return $q.reject('RFC encontrado');
                        }
                    }).catch(function (err) { // cacha el error (¿dos veces?)
                        return $q.reject('Error encontrado');
                    });
                };
            }
        };
    }]);