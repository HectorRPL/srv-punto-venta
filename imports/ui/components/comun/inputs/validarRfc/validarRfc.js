/**
 * Created by Héctor on 06/04/2017.
 */
import {buscarRfc} from "../../../../../api/validarRfc/methods";
import "./validarRfc.html";

class ValidarRfc {
    constructor($scope) {
        'ngInject';
    }
}

const name = 'validarRfc';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            rfc: '='
        },
        controller: ValidarRfc
    })
    .directive('rfcEncontrado', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.rfcencontrado = function (modelValue, viewValue) {
                    let rfc = modelValue || viewValue;
                    return buscarRfc.callPromise({
                        rfc: rfc
                    }).then(function (result) {
                        if (result.length === 0) {
                            console.log('No encontró nada');
                        } else {
                            return $q.reject('encontrado');
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);
