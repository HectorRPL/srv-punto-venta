/**
 * Created by Héctor on 17/10/2017.
 */

class CapitalizarInputs {
    constructor($scope) {
        'ngInject';
    }
}

const name = 'capitalizarInputs';

export default angular
    .module(name, [])
    .component(name, {
        controllerAs: name,
        controller: CapitalizarInputs
    })
    .directive('capitalize', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, CapitalizarInputs) {
                var capitalize = function(valor) {
                    if (valor == undefined) valor = '';
                    var capitalized = valor.toUpperCase();
                    if (capitalized !== valor) {
                        CapitalizarInputs.$setViewValue(capitalized);
                        CapitalizarInputs.$render();
                    }
                    return capitalized;
                }
                CapitalizarInputs.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);
            }
        };
    });