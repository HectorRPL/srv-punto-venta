/**
 * Created by Héctor on 13/05/2017.
 */
import "jquery-slimscroll/jquery.slimscroll.min";
import {name as FormasPago} from "./formasPago/formasPago";
import {name as DesgloseCobro} from "./desgloseCobro/desgloseCobro";
import template from "./cobrarOrdenVenta.html";

class CobrarOrdenVenta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.ordenVentaId = $stateParams.ordenVentaId;
        $reactive(this).attach($scope);

        this.ordenVenta = {
            subtotal: 1026.00,
            iva: 16,
        };

        this.pagosOrdenesVenta = [
            {monto: 100, formaPago: 'Efectivo'},
            {monto: 100, formaPago: 'Debito',  tipo: 'Visa', nombreBanco: 'Santander', ultimosCuatroDigitos: 6666},
            {monto: 100, formaPago: 'Credito', tipo: 'Master Card', nombreBanco: 'Bancomer', ultimosCuatroDigitos: 9999},
            {monto: 100, formaPago: 'Transferencia', nombreBanco: 'HSBC', cuenta: 9999},
            {monto: 100, formaPago: 'Cheque', nombreBanco: 'Banorte', cuenta: 9999},
            {monto: 100, formaPago: 'Nota de Credito', numeroNotaCredito: 4612}
        ]
    }
}

const name = 'cobrarOrdenVenta';

export default angular
    .module(name, [
        FormasPago,
        DesgloseCobro
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: CobrarOrdenVenta
    })
    .config(config)
    .directive('fullScroll', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: '650px',
                        railOpacity: 0.9
                    });

                });
            }
        };
    }]);


function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.caja.cobrar.cobrarordenventa', {
            url: '/cobrarordenventa/:ordenVentaId',
            template: '<cobrar-orden-venta></cobrar-orden-venta>'
        });
}


