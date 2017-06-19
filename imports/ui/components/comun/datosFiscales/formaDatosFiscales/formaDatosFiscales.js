/**
 * Created by Héctor on 06/04/2017.
 */
import "./formaDatosFiscales.html";
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad"

class FormaDatosFiscales {
    constructor($scope) {
        'ngInject';
        this.abreviacion = '';
    }

    esPersonaMoral() {
        delete this.datos.email;
        delete this.datos.nombre;
        delete this.datos.apellidoPaterno;
        delete this.datos.apellidoMaterno;
        delete this.datos._id;
        this.datos.tipoPersona = 'PM';
    }
    esPersonaFisica() {
        delete this.datos.email;
        delete this.datos.razonSocial;
        delete this.datos._id;
        this.datos.tipoPersona = 'PF';

    }

}

const name = 'formaDatosFiscales';

// create a module
export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/datosFiscales/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    })
    .directive('existeRfc', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existerfc = function (modelValue, viewValue) {
                    let rfc = modelValue || viewValue;
                    return buscarRfc.callPromise({
                        rfc: rfc
                    }).then(function (result) {
                        if (result) {
                            return $q.reject('RFC encontrado');
                        }
                    }).catch(function (err) { // cacha el error (¿dos veces?)
                        return $q.reject('Error encontrado');
                    });
                };
            }
        };
    }]);
