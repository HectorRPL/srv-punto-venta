/**
 * Created by Héctor on 09/04/2017.
 */
import {obtenerColonias} from "../../../../../api/catalogos/codigosPostales/methods";
import "./codigosPostales.html";

class CodigosPostales {
    constructor($scope) {
        'ngInject';
        this.colonias = {};
        this.direccion = {};
    }
}

const name = 'codigosPostales';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            direccion: '='
        },
        controller: CodigosPostales
    })
    .directive('cpInvalido', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.cpinvalido = function (modelValue, viewValue) {
                    let codigoPostal = modelValue || viewValue; // guarda el valor del ngModel en la variable codigoPostal
                    return obtenerColonias.callPromise({ // llama a método obtenerColonias
                        cp: codigoPostal  // que recibe como parámetro el codigoPostal (ngModel)
                    }).then(function (result) { // como es una callPromise usamos el then (después) para enviar como parámetro una funcion tipo callback
                        scope.codigosPostales.direccion.colonias = result; // guarda lo que trajiste en scope.codigosPostales.direccion.colonias
                        if (result.length === 0) { // Si el result es igual a 0 limpias los campos y mandas el mensaje de no encontrado
                            scope.codigosPostales.direccion.estado = '';
                            scope.codigosPostales.direccion.delMpio = '';
                            return $q.reject('No encontrado');
                        } else { // si el result fue mayor a cero entonces llenas la propiedad con el primer array de cada propiedad encontrada
                            scope.codigosPostales.direccion.estado = result[0].estado;
                            scope.codigosPostales.direccion.estadoId = result[0].codigoEstado;
                            scope.codigosPostales.direccion.delMpio = result[0].delegacionMunicipio;
                        }
                    }).catch(function (err) { // cacha el error (¿dos veces?)
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);




/*

 $q
 Un servicio que le ayuda a ejecutar funciones de forma asíncrona y utilizar sus valores de retorno (o excepciones) cuando se terminan de procesar.

 EA
 By default the value is EA, meaning that both Element names and attribute names can invoke the directive.

 ?ngModel
 When using your directive, it forces it to be used along with the attribute/controller ng-model.

 scope.codigosPostales.direccion.colonias
 vas a guardar en el binding 'direccion' los datos encontrados cuando buscaste el código postal

 attrs
 no se sabe para que se usa este parámetro

 $asyncValidators
 A collection of validations that are expected to perform an asynchronous validation (e.g. a HTTP request). The validation function that is provided is expected to return a promise when it is run during the model validation process

 */