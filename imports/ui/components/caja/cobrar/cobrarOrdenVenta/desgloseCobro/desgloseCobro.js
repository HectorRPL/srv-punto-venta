/**
 * Created by Héctor on 13/05/2017.
 */
import template from "./desgloseCobro.html";

class DesgloseCobro {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        traveler = [
            {  description: 'Senior', Amount: 50},
            {  description: 'Senior', Amount: 50},
            {  description: 'Adult', Amount: 75},
            {  description: 'Child', Amount: 35},
            {  description: 'Infant', Amount: 25 },
        ];

    }

    calcularSaldoXCobrar(){
        Array.prototype.sum = function (prop) {
            var total = 0
            for ( var i = 0, _len = this.length; i < _len; i++ ) {
                total += this[i][prop]
            }
            return total
        }
        return this.pagos.sum("monto");
    }
}

const name = 'desgloseCobro';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/caja/cobrar/cobrarOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: DesgloseCobro,
        bindings: {
            pagos: '=',
            datos: '='
        }
    });
